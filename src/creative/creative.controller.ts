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

    async loadAndTranslateTexts(configPath, product, brand, language, generateKeywords = false) {
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

            let translatedTexts = await this.translateKeywords(JSON.stringify(texts), language);

            // Sanitize and validate JSON response
            translatedTexts = translatedTexts.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remove control characters
            try {
                texts = JSON.parse(translatedTexts.replace(/```/g, '').replace(/JSON/gi, ''));
            } catch (parseError) {
                console.error('Error parsing translated JSON:', parseError.message);
                throw new Error('Invalid JSON format in translated texts');
            }

            if (generateKeywords) {
                let customKeywords = await this.generateCustomTexts(product.product);
                customKeywords = customKeywords.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remove control characters
                try {
                    const newTexts = JSON.parse(customKeywords.replace(/```/g, '').replace(/JSON/gi, ''));
                    texts = { ...texts, ...newTexts };
                } catch (parseError) {
                    console.error('Error parsing custom keywords JSON:', parseError.message);
                    throw new Error('Invalid JSON format in custom keywords');
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
        const API_KEY = 'AIzaSyD_YOrEpX3fm8WR6lru0IK7_-MOkfkk_g4';

        const configuration = new GoogleGenerativeAI(API_KEY);

        const modelId = 'gemini-1.5-flash';
        const model = configuration.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const result = await chat.sendMessage(`translate these keywords to ${language}, output must be the same as the input but with the keywords translated, as JSON format: ${keywords}`);

        const response = await result.response;

        return response.text();
    }

    async generateCustomTexts(product: string) {
        const API_KEY = 'AIzaSyD_YOrEpX3fm8WR6lru0IK7_-MOkfkk_g4';

        const configuration = new GoogleGenerativeAI(API_KEY);

        const modelId = 'gemini-1.5-flash';
        const model = configuration.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const keywords = { title: "Your no-compromises backpack for everyday chores.", firstItem: "Commuting and air travel friendly", secondItem: "Various organizational pockets. Fits up to 26oz", thirdItem: "Bottle and up to 1L/34oz" };

        const result = await chat.sendMessage(`change the values of these keys to match the product "${product}": ${JSON.stringify(keywords)}`);

        const response = await result.response;

        return response.text();
    }

    @Post('generate')
    async generateCreatives(@Req() req, @Res() res) {
        const { product, brand, config } = req.body;

        const baseFilesPath = path.join(__dirname, '..', 'src', 'creative', 'templates', 'files');
        const baseTemplatePath = path.join(__dirname, '..', 'src', 'creative', 'templates');
        const zipOutputPath = path.join(__dirname, '..', 'client');

        try {
            const templatePath1 = path.join(baseTemplatePath, 'sweeps.html.hbs');
            const templatePath2 = path.join(baseTemplatePath, 'sweeps2.html.hbs');
            const templatePath3 = path.join(baseTemplatePath, 'sweeps3.html.hbs');
            const templatePath4 = path.join(baseTemplatePath, 'sweeps4.html.hbs');
            const configPath1 = path.join(baseTemplatePath, 'sweeps.json');
            const configPath2 = path.join(baseTemplatePath, 'sweeps2.json');
            const configPath3 = path.join(baseTemplatePath, 'sweeps3.json');
            const configPath4 = path.join(baseTemplatePath, 'sweeps4.json');
            const outputPath1 = path.join(baseTemplatePath, 'sweeps.html');
            const outputPath2 = path.join(baseTemplatePath, 'sweeps2.html');
            const outputPath3 = path.join(baseTemplatePath, 'sweeps3.html');
            const outputPath4 = path.join(baseTemplatePath, 'sweeps4.html');

            const template1 = await this.loadTemplate(templatePath1);
            const template2 = await this.loadTemplate(templatePath2);
            const template3 = await this.loadTemplate(templatePath3);
            const template4 = await this.loadTemplate(templatePath4);

            const texts1 = await this.loadAndTranslateTexts(configPath1, product, brand, config.language);
            const texts2 = await this.loadAndTranslateTexts(configPath2, product, brand, config.language);
            const texts3 = await this.loadAndTranslateTexts(configPath3, product, brand, config.language, true);
            const texts4 = await this.loadAndTranslateTexts(configPath4, product, brand, config.language);

            const html1 = this.generateHtml(template1, texts1);
            const html2 = this.generateHtml(template2, texts2);
            const html3 = this.generateHtml(template3, texts3);
            const html4 = this.generateHtml(template4, texts4);

            await this.writeHtmlFiles([outputPath1, outputPath2, outputPath3, outputPath4], [html1, html2, html3, html4]);

            const zipPath = path.join(zipOutputPath, 'creative.rar');
            await this.createZip(baseTemplatePath, zipPath);

            res.download(zipPath, 'creatives.rar', async (err) => {
                if (err) {
                    console.error('Error during file download:', err);
                    return res.status(404).send('File not found');
                }

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
                stack: error.stack
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

    async createZip(sourceFolder, outPath) {
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

            // Step 1: Read the source folder and process the files
            const templateFiles = readdirSync(sourceFolder);

            // Filter out only the files that need to be processed (ignoring /files)
            const creatives = ['sweeps', 'sweeps2', 'sweeps3', 'sweeps4'];
            creatives.forEach((creative, index) => {
                const creativeFolder = `creative${index + 1}`;

                // Step 2: Create a folder for each creative and add files
                archive.directory(path.join(sourceFolder, 'files'), `${creativeFolder}/files`);

                // Step 3: Add the renamed index.html (renamed from sweeps.html)
                const sweepsFile = path.join(sourceFolder, `${creative}.html`);
                const indexHtmlPath = `${creativeFolder}/index.html`;
                archive.append(createReadStream(sweepsFile), { name: indexHtmlPath });

                // Step 4: Exclude sweeps.json and sweeps.html.hbs
                // (We don't add them to the zip archive, so no need to read them)

                // Step 5: Finalize and add the creative folder to the archive
            });

            archive.finalize();
        });
    }
}
