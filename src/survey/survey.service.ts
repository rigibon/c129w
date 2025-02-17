import { join } from 'path';
import { promises as fs } from 'fs';
import handlebars from 'handlebars';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as path from 'path';
import { commentNamesByCountry } from 'src/translation/commentNames';

export class SurveyService {
    getTemplateFilePath(templateName) {
        return join(__dirname, '..', 'client', templateName, 'index.html.hbs');
        // return join(__dirname, '..', 'client', 'index.html.hbs');
    }

    getTextsFilePath(templateName) {
        return join(__dirname, '..', 'client', templateName, 'params.json');
        // return join(__dirname, '..', 'client', 'params.json');
    }

    getOutputFilePath(templateName) {
        return join(__dirname, '..', 'client', templateName, 'output.html');
        // return join(__dirname, '..', 'client', 'tryetco', 'output.html');
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

    async translateKeywords(keywords: any, language: string) {
        const API_KEY = 'AIzaSyD_YOrEpX3fm8WR6lru0IK7_-MOkfkk_g4';

        const configuration = new GoogleGenerativeAI(API_KEY);

        const modelId = 'gemini-1.5-flash-8b';
        const model = configuration.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const result = await chat.sendMessage(`translate these keywords to ${language}, output must be the same as the input but with the keywords translated, as JSON format: ${keywords}`);

        const response = await result.response;

        return response.text();
    }

    async addCustomKeywords(template, texts, product, brand, survey, config) {
        texts.text1 = 'Over ' + config.currency + '4,000,000 in Offers given out so far!';
        texts.text3 = 'Dear ' + brand.name + ' Shopper,';
        texts.text32 =
            'This website is not affiliated with or endorsed by ' +
            brand.name +
            ' or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website.';

        texts.questionCount1 = 'Question 1 on 8';
        texts.questionCount2 = 'Question 2 on 8';
        texts.questionCount3 = 'Question 3 on 8';
        texts.questionCount4 = 'Question 4 on 8';
        texts.questionCount5 = 'Question 5 on 8';
        texts.questionCount6 = 'Question 6 on 8';
        texts.questionCount7 = 'Question 7 on 8';
        texts.questionCount8 = 'Question 8 on 8';

        var newSurvey = { ...survey, surveyTitle: `${brand.name} Shopper Experience Survey` };

        texts = { ...texts, ...newSurvey };
    }

    async addCustomComments(geo, templateName) {
        try {
            for (var i = 1; i <= 5; i++) {
                const tempFilePathImage = path.join(__dirname, '..', 'client', 'images', `${i}_${geo}.jpg`);
                const newFilePathImage = path.join(__dirname, '..', 'client', templateName, 'files', `${i}.jpg`);

                await fs.copyFile(tempFilePathImage, newFilePathImage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    private parseSurvey(surveyString: string): Record<string, string> {
        const entries = surveyString.match(/"([^"]*)"/g)?.map((entry) => entry.replace(/"/g, '')) || [];
        const surveyData: Record<string, string> = {};

        let questionIndex = 1;
        let optionIndex = 1;

        entries.forEach((entry, index) => {
            if (index % 5 === 0) {
                surveyData[`question${questionIndex}`] = entry;
                questionIndex++;
                optionIndex = 1;
            } else {
                surveyData[`option${questionIndex - 1}_${optionIndex}`] = entry;
                optionIndex++;
            }
        });

        return surveyData;
    }

    async generateSurvey(product, brand, survey, config) {
        const templateFilePath = this.getTemplateFilePath(config.templateName);
        const textsFilePath = this.getTextsFilePath(config.templateName);
        const outputFilePath = this.getOutputFilePath(config.templateName);
        var template;

        try {
            template = await this.readAndCompileTemplate(templateFilePath);
        } catch (error) {
            console.error(`Error reading or compiling the template: ${error.message}`);
            throw new Error('Failed to read or compile template');
        }

        var texts;
        try {
            texts = await this.readTexts(textsFilePath);

            if (config.templateName === "tryetco") {
                this.addCustomKeywords("tryetco", texts, product, brand, survey, config);
            }

            var parsedSurvey = this.parseSurvey(survey);

            parsedSurvey = { ...parsedSurvey, surveyTitle: `${brand.name} Shopper Experience Survey` };

            texts = { ...texts, ...product, ...brand, ...parsedSurvey, ...commentNamesByCountry[config.geo] };
        } catch (error) {
            console.error(`Error reading texts: ${error.message}`);
            throw new Error('Failed to read texts');
        }

        if (config.language !== '' && config.language !== 'english') {
            try {
                texts = await this.translateKeywords(JSON.stringify(texts), config.language);
                texts = JSON.parse(texts.replace(/```/g, '').replace(/JSON/g, '').replace(/json/g, ''));
                texts = { ...texts, ...config };
            } catch (error) {
                console.error(`Error translating keywords: ${error.message}`);
                throw new Error('Failed to translate texts');
            }
        }

        var html;
        try {
            html = template(texts);
        } catch (error) {
            console.error(`Error generating HTML from template: ${error.message}`);
            throw new Error('Failed to generate HTML');
        }

        try {
            await this.writeHtmlToFile(outputFilePath, html);

            console.log(config);

            const tempFilePath = path.join(__dirname, '..', 'client', 'images', `flaglogo_${config.geo}.png`);
            const newFilePath = path.join(__dirname, '..', 'client', config.templateName, 'files', 'flaglogo.png');

            try {
                await fs.copyFile(tempFilePath, newFilePath);

                await this.addCustomComments(config.geo, config.templateName);
            } catch (error) {
                console.error(`Error copying flag logo for ${config.geo}: ${error.message}`);
                throw new Error(`Failed to copy flag logo for ${config.geo}`);
            }
        } catch (error) {
            console.error(`Error writing HTML to file: ${error.message}`);
            throw new Error('Failed to write HTML to file');
        }

        return 'Survey generated successfully';
    }
}