import { BadRequestException, Body, Controller, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { SurveyService } from "./survey.service";
import * as path from 'path';
import { promises as fs, createWriteStream } from "fs";
import * as archiver from "archiver";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller('survey')
export class SurveyController {

    constructor(private readonly surveyService: SurveyService) { }

    async createZip(sourceFolder, outPath, folderName, templateName) {
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

            const fs = require('fs');
            const path = require('path');

            const filterFiles = fs.readdirSync(sourceFolder).filter(file => {
                return !['params.json', 'index.php', 'index.html.hbs', 'index.html'].includes(file);
            });

            try {
                filterFiles.forEach(file => {
                var filePath = path.join(sourceFolder, file);

                if (file === 'output.html') {
                    if (templateName === 'config' || templateName==='config_tt' || templateName === 'config_offerwall') {
                        archive.file(filePath, { name: path.join(folderName, folderName + '.php') });
                    }
                    else {
                        archive.file(filePath, { name: path.join(folderName, 'index.php') });
                    }
                }

                // archive.file(filePath, { name: path.join(folderName, file) });
            });

            archive.directory(path.join(sourceFolder, 'files'), path.join(folderName, 'files'));

            archive.finalize();
            } catch (error) {
                console.error('Error while creating zip:', error);
                reject(error);
            }
            
        });
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req, @Res() res) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files were uploaded');
        }

        try {
            const newDirPath = path.join(__dirname, '..', 'client', req.body.directory);

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

    @Post('build')
    async build(@Req() req, @Res() res) {
        try {
            const { product, brand, survey, config } = req.body;

            if (!product || !brand || !config) {
                return res.status(400).send({
                    message: 'Missing required parameters'
                });
            }

            const outputFilePath = path.join(__dirname, '..', 'client');

            const baseFilesPath = path.join(__dirname, '..', 'client', config.templateName, 'files');

            const templatePath = path.join(__dirname, '..', 'client', config.templateName);

            const message = await this.surveyService.generateSurvey(product, brand, survey, config);

            const zipPath = path.join(outputFilePath, 'creative.zip');

            await this.createZip(templatePath, zipPath, config.folderName, config.templateName)
                .then(async () => {
                    res.download(zipPath, 'final.zip', async (err) => {
                        try {
                            let filesToRemove: string[] = [];
                            if (product) {
                                filesToRemove = [
                                    product.productImage && path.join(baseFilesPath, product.productImage),
                                    product.commentImage1 && path.join(baseFilesPath, product.commentImage1),
                                    product.commentImage2 && path.join(baseFilesPath, product.commentImage2),
                                    brand.brandLogo && path.join(baseFilesPath, brand.brandLogo),
                                    brand.backgroundImage && path.join(baseFilesPath, brand.backgroundImage),
                                    brand.favicon && path.join(baseFilesPath, brand.favicon),
                                ].filter(Boolean);
                            } else {
                                filesToRemove = [
                                    brand.brandLogo && path.join(baseFilesPath, brand.brandLogo),
                                    brand.backgroundImage && path.join(baseFilesPath, brand.backgroundImage),
                                    brand.favicon && path.join(baseFilesPath, brand.favicon),
                                ].filter(Boolean);
                            }
                            
                            

                            for (const fileToRemove of filesToRemove) {
                                try {
                                    await fs.stat(fileToRemove);
                                    await fs.unlink(fileToRemove);
                                } catch (error) { }
                            }

                            if (err) {
                                res.status(404).send('File not found');
                            }
                        } catch (error) {
                            console.error('Error removing files:', error);
                        }
                    });
                })
                .catch((error) => {
                    res.status(500).json({ message: 'Error creating zip.' });
                });

            return { message: 'HTML file generated successfully' };

            return res.status(200).send({ message });

        } catch (error) {
            console.error('Error generating survey:', error);

            return res.status(500).send({
                message: 'Error generating survey',
                error: error.message,
                stack: error.stack
            });
        }
    }

    @Post('generate')
    async generateFromPrompt(
        @Body() body: { prompt: string; outputFormat: string },
    ): Promise<any> {
        const { prompt, outputFormat } = body;
        const responseText = await this.surveyService.generate(prompt, outputFormat);

        try {
            return JSON.parse(responseText);
        } catch (e) {
            return { raw: responseText };
        }
    }
}