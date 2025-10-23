import { BadRequestException, Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { BrandsService } from 'src/brands/brands.service';
import { promises as fs, createWriteStream } from 'fs';
import * as archiver from 'archiver';
import axios from 'axios';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { translate } from 'google-translate-api-x';
import * as handlebars from 'handlebars';

interface ProductData {
    [key: string]: string;
}

@Controller('translate')
export class TranslationController {
    brandLogo: string = '';
    productData: ProductData;

    constructor(
        private readonly translationService: TranslationService,
        private readonly brandsService: BrandsService,
    ) { }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req, @Res() res) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files were uploaded');
        }

        try {
            var newDirPath;

            if (req.body.directory && req.body.directory === "creative") {
                newDirPath = path.join(__dirname, '..', 'src', 'creative', 'templates', 'files');

                for (const file of files) {
                    var tempFilePath;
                    tempFilePath = path.join(__dirname, '..', 'client', file.filename);

                    const newFilePath = path.join(newDirPath, file.filename);

                    await fs.copyFile(tempFilePath, newFilePath);
                    await fs.unlink(tempFilePath);
                }

                res.json({ message: 'Files uploaded and moved successfully!' });
            } else {
                newDirPath = path.join(__dirname, '..', 'client', req.body.directory);

                for (const file of files) {
                    var tempFilePath;
                    tempFilePath = path.join(__dirname, '..', 'client', file.filename);

                    const newFilePath = path.join(newDirPath, file.filename);

                    console.log(newFilePath);
                    await fs.rename(tempFilePath, newFilePath);
                }

                res.json({ message: 'Files uploaded and moved successfully!' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while processing the files.' });
        }

        return { message: 'Files uploaded successfully', files };
    }

    @Post('translation')
    async translation(@Req() req, @Res() res) {
        const { textArray, language } = req.body;
        console.log(textArray);

        const translations = Object.keys(textArray).map((key) => {
            if (key === 'comments') return Promise.resolve('');

            const property = textArray[key];
            return translate(property, {
                to: language,
                forceTo: true,
            }).then((translationResult) => translationResult.text);
        });

        try {
            const translatedTexts = await Promise.all(translations);

            const result = Object.keys(textArray).reduce((acc, key, index) => {
                acc[key] = translatedTexts[index];
                return acc;
            }, {});

            res.send(result);
        } catch (error) {
            console.error('Translation error:', error);
            res.status(500).send({ error: 'Translation failed' });
        }
    }




    @Post('build')
    async build(@Req() req, @Res() res) {
        const { templateName } = req.body;

        const templateFilePath = path.join(__dirname, '..', 'client', templateName, 'index.html.hbs');
        const textsFilePath = path.join(__dirname, '..', 'client', templateName, 'params.json');
        const outputFilePath = path.join(__dirname, '..', 'client', 'hrblock', 'output.html');

        const templateContent = await fs.readFile(templateFilePath, 'utf8');
        const template = handlebars.compile(templateContent);

        var texts = JSON.parse(await fs.readFile(textsFilePath, 'utf8'));

        const html = template(texts);

        await fs.writeFile(outputFilePath, html, 'utf-8');

        res.status(200).send({ message: "Survey generated successfully" });
    }

    @Post('generate')
    async generate(@Query('translateTexts') translateTexts: string, @Query('language') language: string, @Req() req, @Res() res) {
        const { productData, brandData, configData, survey } = req.body;

        console.log(configData);

        const parsedSurveyData = this.parseSurvey(survey);
        const parsedSurvey = {
            ...parsedSurveyData,
            surveyTitle: `${brandData.name} Shopper Experience Survey`,
            surveyQuestions: this.formatSurveyForPHP(parsedSurveyData)
        };

        const templatePath = path.join(__dirname, '..', 'client', 'tryetco');
        const outputFilePath = path.join(__dirname, '..', 'client');

        const baseFilesPath = path.join(__dirname, '..', 'client', 'tryetco', 'files');

        const translate = translateTexts === 'true';
        await this.translationService.generateHtmlWithTranslations(translate, language, brandData, productData, configData, parsedSurvey);

        const zipPath = path.join(outputFilePath, 'creative.zip');

        await this.createZip(templatePath, zipPath)
            .then(async () => {
                res.download(zipPath, 'final.zip', async (err) => {
                    const filesToRemove = [
                        path.join(baseFilesPath, productData.productImage),
                        path.join(baseFilesPath, productData.commentImage1),
                        path.join(baseFilesPath, productData.commentImage2),
                        path.join(baseFilesPath, brandData.brandLogo),
                        path.join(baseFilesPath, brandData.backgroundImage),
                        path.join(baseFilesPath, brandData.favicon),
                    ];

                    for (const fileToRemove of filesToRemove) {
                        try {
                            await fs.stat(fileToRemove);
                            await fs.unlink(fileToRemove);
                        } catch (error) { }
                    }

                    if (err) {
                        res.status(404).send('File not found');
                    }
                });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Error creating zip.' });
            });

        return { message: 'HTML file generated successfully' };
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
            archive.directory(sourceFolder, false);
            archive.finalize();
        });
    }

    private parseSurvey(surveyString: string): Record<string, string> {
        try {
            console.log('=== PARSING SURVEY DATA (Translation Controller) ===');
            console.log('Raw survey data received:');
            console.log(surveyString);
            console.log('Data type:', typeof surveyString);
            console.log('Data length:', surveyString.length);
            
            // Clean the string first - remove markdown formatting
            let cleanedString = surveyString;
            
            // Remove markdown code blocks
            cleanedString = cleanedString.replace(/```json\s*/g, '').replace(/```\s*/g, '');
            
            // Remove any leading/trailing whitespace
            cleanedString = cleanedString.trim();
            
            console.log('Cleaned survey data:');
            console.log(cleanedString);

            // Check if this is the new JSON array format from frontend
            if (cleanedString.includes('["') || cleanedString.includes("[\"")) {
                console.log('Detected JSON array format');
                
                // Try to extract individual JSON arrays
                const arrayMatches = cleanedString.match(/\[[^\]]*\]/g);
                console.log('Array matches found:', arrayMatches);
                
                if (arrayMatches && arrayMatches.length > 0) {
                    const surveyData: Record<string, string> = {};
                    
                    arrayMatches.forEach((arrayStr, index) => {
                        try {
                            // Clean individual array string
                            let cleanArrayStr = arrayStr.trim();
                            if (cleanArrayStr.endsWith(',')) {
                                cleanArrayStr = cleanArrayStr.slice(0, -1);
                            }
                            
                            console.log(`Parsing array ${index + 1}:`, cleanArrayStr);
                            
                            const parsedArray = JSON.parse(cleanArrayStr);
                            if (Array.isArray(parsedArray) && parsedArray.length > 0) {
                                surveyData[`question${index + 1}`] = parsedArray[0]; // First element is the question
                                
                                // Rest are options
                                for (let i = 1; i < parsedArray.length; i++) {
                                    surveyData[`option${index + 1}_${i}`] = parsedArray[i];
                                }
                                
                                console.log(`Successfully parsed question ${index + 1}:`, parsedArray[0]);
                            }
                        } catch (e) {
                            console.error(`Error parsing survey array ${index + 1}:`, e);
                            console.error('Array content:', arrayStr);
                        }
                    });
                    
                    console.log('Final parsed survey data (JSON format):', surveyData);
                    return surveyData;
                }
            }
            
            console.log('Detected old comma-separated format');
            
            // Fallback to old format - but let's try a different approach
            // Split by commas and parse each part
            let entries: string[] = [];
            
            // Try to split by quotes first
            const quotedEntries = cleanedString.match(/"([^"]*)"/g);
            if (quotedEntries) {
                entries = quotedEntries.map((entry) => entry.replace(/"/g, ''));
                console.log('Found quoted entries:', entries);
            } else {
                // If no quotes, try to split by commas
                entries = cleanedString.split(',').map(s => s.trim()).filter(s => s.length > 0);
                console.log('Found comma-separated entries:', entries);
            }

            const surveyData: Record<string, string> = {};
            
            // Different approach: assume every 5 entries = 1 question + 4 options
            let questionIndex = 1;
            
            for (let i = 0; i < entries.length; i += 5) {
                const question = entries[i];
                
                if (question && question.trim()) {
                    surveyData[`question${questionIndex}`] = question.trim();
                    
                    // Add the options (next 4 entries)
                    for (let j = 1; j <= 4; j++) {
                        const optionIndex = i + j;
                        if (optionIndex < entries.length && entries[optionIndex] && entries[optionIndex].trim()) {
                            surveyData[`option${questionIndex}_${j}`] = entries[optionIndex].trim();
                        }
                    }
                    
                    console.log(`Old format - parsed question ${questionIndex}:`, question.trim());
                    questionIndex++;
                }
            }
            
            console.log('Final parsed survey data (old format):', surveyData);
            return surveyData;
        } catch (error) {
            console.error('Error parsing survey:', error);
            console.error('Survey string was:', surveyString);
            return {};
        }
    }

    private formatSurveyForPHP(surveyData: Record<string, string>): string {
        const surveys: string[][] = [];
        
        // Group questions and their options
        const questionKeys = Object.keys(surveyData).filter(key => key.startsWith('question'));
        
        questionKeys.forEach(questionKey => {
            const questionNum = questionKey.replace('question', '');
            const question = surveyData[questionKey];
            const options: string[] = [];
            
            // Find all options for this question
            let optionIndex = 1;
            while (surveyData[`option${questionNum}_${optionIndex}`]) {
                options.push(surveyData[`option${questionNum}_${optionIndex}`]);
                optionIndex++;
            }
            
            // Create the array: [question, option1, option2, option3, option4]
            surveys.push([question, ...options]);
        });
        
        // Convert to PHP array format
        const phpArrays = surveys.map(survey => {
            const quotedItems = survey.map(item => `"${item.replace(/"/g, '\\"')}"`);
            return `array(${quotedItems.join(', ')})`;
        });
        
        return `$survey = array(\n    ${phpArrays.join(',\n    ')}\n);`;
    }

    @Post('translate')
    async translateKeywords(@Req() req) {
        const { keywords } = req.body;

        const API_KEY = process.env.API_KEY;

        const configuration = new GoogleGenerativeAI(API_KEY);

        const modelId = 'gemini-2.5-flash';
        const model = configuration.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const result = await chat.sendMessage(`translate these keywords to swedish, output must be the same as the input but with the keywords translated, as JSON format: ${keywords}`);

        const response = await result.response;

        return response.text();
    }

    @Post('survey')
    async generateSurvey(@Req() req) {
        const { brand, product, template } = req.body;

        const API_KEY = process.env.API_KEY;
        const URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-latest:generateContent';

        const configuration = new GoogleGenerativeAI(API_KEY);

        const modelId = 'gemini-2.5-flash';
        const model = configuration.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const prompt = template === "config_offerwall" ?
            "change these questions to fit a shopper experience survey about " + brand + ". Also change the questions that talk about a specific product to talk only about the brand." :
            "change these questions to fit a shopper experience survey about " + brand + " and a " + product + " as prize";


        const survey = template === "config_offerwall" ?
            `"How often do you visit CVS for your shopping needs?",
        "Multiple times a week",
        "Once a week",
        "A few times a month",
        "Rarely or never",
        "What primarily drives your choice to shop at CVS?",
        "Convenience of location",
        "Product selection",
        "Prices and deals",
        "Loyalty rewards program",
        "When seeing ads from CVS, how do you typically respond?",
        "I look for items I need",
        "I browse if there's a good deal",
        "I consider visiting if there's a promo",
        "I usually ignore the ads",
        "How has your perception of the CVS brand changed over the past year?",
        "Significantly more positive",
        "Somewhat more positive",
        "No change",
        "More negative",
        "Which aspect of the CVS brand do you find most appealing?",
        "Reliability",
        "Innovation",
        "Convenience",
        "Store experience / design",
        "What quality do you most associate with the CVS brand?",
        "Trustworthiness",
        "Affordability",
        "Innovation",
        "Personal care",
        "In terms of health and wellness products, how well do you think CVS meets your needs?",
        "Exceeds my needs",
        "Meets my needs well",
        "Adequately meets my needs",
        "Does not meet my needs",
        "How likely are you to participate in future promotions or surveys from CVS?",
        "Very likely",
        "Somewhat likely",
        "Not very likely",
        "Not at all likely"`
            :
            `"How often do you visit CVS for your shopping needs?",
        "Multiple times a week",
        "Once a week",
        "A few times a month",
        "Rarely or never",
        "What primarily drives your choice to shop at CVS?",
        "Convenience of location",
        "Product selection",
        "Prices and deals",
        "Loyalty rewards program",
        "When seeing ads from CVS, how do you typically respond?",
        "I look for items I need",
        "I browse if there's a good deal",
        "I consider visiting if there's a promo",
        "I usually ignore the ads",
        "If you won a Medicare Kit from CVS, how would it change your view of the CVS?",
        "Significantly more positive",
        "Somewhat more positive",
        "No change",
        "More negative",
        "Regarding the Medicare Kit, which feature is most appealing to you?",
        "Durability",
        "Cooling efficiency",
        "Portability",
        "Design and appearance",
        "How likely are you to use a Medicare Kit if you received one from CVS?",
        "Very likely",
        "Somewhat likely",
        "Unlikely",
        "I would not use it",
        "In terms of health and wellness products, how well do you think CVS meets your needs?",
        "Exceeds my needs",
        "Meets my needs well",
        "Adequately meets my needs",
        "Does not meet my needs",
        "How likely are you to participate in future promotions or surveys from CVS?",
        "Very likely",
        "Somewhat likely",
        "Not very likely",
        "Not at all likely"`


        const fullPrompt = `${prompt}. 

IMPORTANT: Return ONLY individual JSON arrays, one per line, where each array contains the question as the first element followed by the answer options.

Example format:
["How often do you visit CVS for your shopping needs?", "Multiple times a week", "Once a week", "A few times a month", "Rarely or never"]
["What primarily drives your choice to shop at CVS?", "Convenience of location", "Product selection", "Prices and deals", "Loyalty rewards program"]

Based on this survey data, generate 8 questions with 4 options each:
${survey}

Return ONLY the JSON arrays, one per line, no additional text, explanations, or code blocks.`;

        const result = await chat.sendMessage(fullPrompt);
        const response = await result.response;
        const responseText = response.text();
        
        
        // Try to validate the JSON response
        try {
            const parsed = JSON.parse(responseText.replace(/```json\n?|```\n?/g, ''));
            return responseText;
        } catch (parseError) {
            return responseText;
        }
    }
}
