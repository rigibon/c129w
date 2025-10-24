import { BadRequestException, Controller, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreativeService } from './creative.service';
import * as path from "path";
import { copyFileSync, createReadStream, createWriteStream, promises as fs, mkdirSync, readdirSync, rmSync } from 'fs';
import handlebars from 'handlebars';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as archiver from "archiver";

@Controller('creative')
export class CreativeController {

    constructor(private readonly creativeService: CreativeService) { }

    async loadTemplate(templatePath) {
        try {
            return await this.readAndCompileTemplate(templatePath);
        } catch (error) {
            console.error(`Error reading or compiling the template: ${error.message}`);
            throw new Error('Failed to read or compile template');
        }
    }

    async loadAndTranslateTexts(configPath, product, brand, config, generateKeywords = false) {
        try {
            let texts = await this.readTexts(configPath);

            texts.product = product.product;
            texts.brand = brand.name;
            texts.mainColor = brand.mainColor;
            texts.secondaryColor = brand.secondaryColor;
            texts.brandLogo = brand.brandLogo;
            texts.productImage = product.productImage;
            texts.commentImage1 = product.commentImage1;
            texts.commentImage2 = product.commentImage2;
            texts.geo = config ? config.geo : "US";
            texts.currency = config ? config.currency : "$";

            texts.price = product.price;
            texts.promo_price = product.promo_price;

            // Only translate if config.language is specified and not English
            if (config.language && config.language !== '' && config.language.toLowerCase() !== 'english') {
                let translatedTexts = await this.translateKeywords(JSON.stringify(texts), config.language);

                // Clean and parse the translated response
                translatedTexts = this.cleanJsonResponse(translatedTexts);
                try {
                    texts = JSON.parse(translatedTexts);
                } catch (parseError) {
                    console.error('Error parsing translated JSON:', parseError.message);
                    console.error('Translated response:', translatedTexts);
                    console.warn('Using original texts due to translation parsing error');
                    // Fall back to original texts if translation fails
                }
            }

            if (generateKeywords) {
                try {
                    let customKeywords = await this.generateCustomTexts(product.product);
                    customKeywords = this.cleanJsonResponse(customKeywords);
                    const newTexts = JSON.parse(customKeywords);
                    texts = { ...texts, ...newTexts };
                } catch (parseError) {
                    console.error('Error parsing custom keywords JSON:', parseError.message);
                    console.warn('Continuing without custom keywords due to parsing error');
                    // Continue without custom keywords if they fail to parse
                }
            }

            return texts;
        } catch (error) {
            console.error(`Error reading or translating texts: ${error.message}`);
            throw new Error('Failed to read or translate texts');
        }
    }

    generateHtml(template, texts) {
        try {
            return template(texts);
        } catch (error) {
            console.error(`Error generating HTML from template: ${error.message}`);
            throw new Error('Failed to generate HTML');
        }
    }

    async writeHtmlFiles(outputPaths, htmls) {
        try {
            for (let i = 0; i < outputPaths.length; i++) {
                await this.writeHtmlToFile(outputPaths[i], htmls[i]);
            }
        } catch (error) {
            console.error(`Error writing HTML to file: ${error.message}`);
            throw new Error('Failed to write HTML files');
        }
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req, @Res() res) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files were uploaded');
        }

        try {
            const newDirPath = path.join(__dirname, '..', 'src', 'creative', 'templates', 'files');

            for (const file of files) {
                console.log(file);
                const tempFilePath = path.join(__dirname, '..', 'client', file.filename);
                const newFilePath = path.join(newDirPath, file.filename);

                console.log(newFilePath);
                await fs.rename(tempFilePath, newFilePath);
            }

            res.json({ message: 'Files uploaded and moved successfully!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while processing the files.' });
        }

        return { message: 'Files uploaded successfully', files };
    }

    async translateKeywords(keywords: any, language: string) {
        if (language === '' || language === 'english') {
            return keywords; // Return as-is if no translation needed
        }

        const API_KEY = process.env.API_KEY;

        const configuration = new GoogleGenerativeAI(API_KEY);

        const modelId = 'gemini-2.5-flash';
        const model = configuration.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const result = await chat.sendMessage(
            `Translate these keywords to ${language}. The output must be EXACTLY the same JSON structure as the input but with the keywords translated. Return only valid JSON, no explanations or extra text: ${keywords}`
        );

        const response = await result.response;

        return response.text();
    }

    async generateCustomTexts(product: string) {
        const API_KEY = process.env.API_KEY;

        const configuration = new GoogleGenerativeAI(API_KEY);

        const modelId = 'gemini-2.5-flash';
        const model = configuration.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const keywords = {
            title: "Your no-compromises backpack for everyday chores.",
            firstItem: "Commuting and air travel friendly",
            secondItem: "Various organizational pockets. Fits up to 26oz",
            thirdItem: "Bottle and up to 1L/34oz"
        };

        const result = await chat.sendMessage(
            `Change the values of these keys to match the product "${product}". Return only valid JSON with the same structure, no explanations or extra text: ${JSON.stringify(keywords)}`
        );

        const response = await result.response;

        return response.text();
    }

    @Post('generate')
    async generateCreatives(@Req() req, @Res() res) {
        const { product, brand, config, selectedTemplates } = req.body;

        const baseFilesPath = path.join(__dirname, '..', 'src', 'creative', 'templates', 'files');
        const baseTemplatePath = path.join(__dirname, '..', 'src', 'creative', 'templates');
        const zipOutputPath = path.join(__dirname, '..', 'client');

        // map id -> paths
        const templateMap: Record<string, { template: string; config: string; output: string }> = {
            "0": {
                template: path.join(baseTemplatePath, 'sweeps.html.hbs'),
                config: path.join(baseTemplatePath, 'sweeps.json'),
                output: path.join(baseTemplatePath, 'sweeps.html'),
            },
            "1": {
                template: path.join(baseTemplatePath, 'sweeps2.html.hbs'),
                config: path.join(baseTemplatePath, 'sweeps2.json'),
                output: path.join(baseTemplatePath, 'sweeps2.html'),
            },
            "2": {
                template: path.join(baseTemplatePath, 'sweeps3.html.hbs'),
                config: path.join(baseTemplatePath, 'sweeps3.json'),
                output: path.join(baseTemplatePath, 'sweeps3.html'),
            },
            "3": {
                template: path.join(baseTemplatePath, 'sweeps4.html.hbs'),
                config: path.join(baseTemplatePath, 'sweeps4.json'),
                output: path.join(baseTemplatePath, 'sweeps4.html'),
            },
            "4": {
                template: path.join(baseTemplatePath, 'fb.html.hbs'),
                config: path.join(baseTemplatePath, 'fb.json'),
                output: path.join(baseTemplatePath, 'fb.html'),
            },
            "5": {
                template: path.join(baseTemplatePath, 'fb2.html.hbs'),
                config: path.join(baseTemplatePath, 'fb2.json'),
                output: path.join(baseTemplatePath, 'fb2.html'),
            },
            "6": {
                template: path.join(baseTemplatePath, 'halloween.html.hbs'),
                config: path.join(baseTemplatePath, 'halloween.json'),
                output: path.join(baseTemplatePath, 'halloween.html'),
            },
            "7": {
                template: path.join(baseTemplatePath, 'xmas.html.hbs'),
                config: path.join(baseTemplatePath, 'xmas.json'),
                output: path.join(baseTemplatePath, 'xmas.html'),
            },
            "8": {
                template: path.join(baseTemplatePath, 'blackfriday.html.hbs'),
                config: path.join(baseTemplatePath, 'blackfriday.json'),
                output: path.join(baseTemplatePath, 'blackfriday.html'),
            },
        };

        try {
            const outputs: string[] = [];

            for (const id of selectedTemplates) {
                const { template, config: configPath, output } = templateMap[id];

                const tmpl = await this.loadTemplate(template);
                const texts = await this.loadAndTranslateTexts(configPath, product, brand, config, false);
                const html = this.generateHtml(tmpl, texts);

                await this.writeHtmlFiles([output], [html]);
                outputs.push(output);
            }

            // Create archive name in format: "US - Apple iPhone 17 Pro"
            const archiveName = `${config.geo.toUpperCase()} - ${brand.name} ${product.product}`;
            const sanitizedArchiveName = this.sanitizeFilename(archiveName);
            const zipPath = path.join(zipOutputPath, `${sanitizedArchiveName}.rar`);
            await this.createZip(baseTemplatePath, zipPath, selectedTemplates, archiveName);

            res.download(zipPath, `${sanitizedArchiveName}.rar`, async (err) => {
                if (err) {
                    console.error('Error during file download:', err);
                    return res.status(404).send('File not found');
                }

                // cleanup images
                const filesToRemove = [
                    path.join(baseFilesPath, product.productImage),
                    path.join(baseFilesPath, brand.brandLogo),
                    path.join(baseFilesPath, product.commentImage1),
                    path.join(baseFilesPath, product.commentImage2),
                ];

                for (const fileToRemove of filesToRemove) {
                    try {
                        await fs.stat(fileToRemove);
                        await fs.unlink(fileToRemove);
                    } catch (error) {
                        console.error(`Failed to delete file ${fileToRemove}:`, error);
                    }
                }
            });
        } catch (error) {
            console.error('Error generating creatives:', error);
            return res.status(500).send({
                message: 'Error generating creatives',
                error: error.message,
                stack: error.stack,
            });
        }
    }

    async readAndCompileTemplate(templateFilePath) {
        const templateContent = await fs.readFile(templateFilePath, 'utf8');
        return handlebars.compile(templateContent);
    }

    async readTexts(textsFilePath) {
        const textsContent = await fs.readFile(textsFilePath, 'utf8');
        return JSON.parse(textsContent);
    }

    async writeHtmlToFile(outputFilePath, html) {
        await fs.writeFile(outputFilePath, html, 'utf-8');
    }

    async createZip(sourceFolder: string, outPath: string, selectedIds: string[], folderName: string) {
        return new Promise((resolve, reject) => {
            const output = createWriteStream(outPath);
            const archive = archiver('zip');

            output.on('close', () => {
                resolve(null);
            });

            archive.on('error', (err) => {
                reject(err);
            });

            archive.pipe(output);

            // map IDs to creative base names
            const idToCreative: Record<string, string> = {
                "0": "sweeps",
                "1": "sweeps2",
                "2": "sweeps3",
                "3": "sweeps4",
                "4": "fb",
                "5": "fb2",
                "6": "halloween",
                "7": "xmas",
                "8": "blackfriday",
            };

            // loop only over selected IDs
            selectedIds.forEach((id, index) => {
                const creative = idToCreative[id];
                if (!creative) return;

                const creativeFolder = `${folderName}/creative${index + 1}`;

                // add common assets (files/)
                archive.directory(path.join(sourceFolder, "files"), `${creativeFolder}/files`);

                // add generated HTML, renamed to index.html
                const htmlFile = path.join(sourceFolder, `${creative}.html`);
                const indexHtmlPath = `${creativeFolder}/index.html`;

                archive.append(createReadStream(htmlFile), { name: indexHtmlPath });
            });

            archive.finalize();
        });
    }

    private cleanJsonResponse(response: string): string {
        try {
            // Remove any markdown code blocks
            let cleaned = response.replace(/```(json|JSON)?|```/g, '').trim();

            // Remove control characters
            cleaned = cleaned.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

            // Remove any potential BOM or invisible characters
            cleaned = cleaned.replace(/^\uFEFF/, '');

            // Try to extract JSON if there's extra text
            const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                cleaned = jsonMatch[0];
            }

            // Log for debugging
            //console.log('Original AI response:', response);
            //console.log('Cleaned response:', cleaned);

            return cleaned;
        } catch (error) {
            console.error('Error cleaning JSON response:', error.message);
            return response;
        }
    }

    private sanitizeFilename(filename: string): string {
        // Remove or replace characters that are not allowed in filenames
        return filename
            .replace(/[<>:"/\\|?*]/g, '_') // Replace invalid characters with underscore
            .replace(/\s+/g, '_') // Replace spaces with underscores
            .replace(/_+/g, '_') // Replace multiple underscores with single underscore
            .replace(/^_+|_+$/g, ''); // Remove leading and trailing underscores
    }
}
