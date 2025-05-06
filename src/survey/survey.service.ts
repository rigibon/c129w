import { join } from 'path';
import { promises as fs } from 'fs';
import handlebars from 'handlebars';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as path from 'path';
import { commentNamesByCountry } from 'src/translation/commentNames';

interface Product {
    product: string;
    description: string;
    price: string;
}

interface Brand {
    name: string;
}

interface Config {
    templateName: string;
    currency: string;
    geo: string;
    language: string;
}

export class SurveyService {
    private readonly AI_API_KEY = 'AIzaSyD_YOrEpX3fm8WR6lru0IK7_-MOkfkk_g4';
    private readonly AI_MODEL_ID = 'gemini-1.5-flash-8b';

    private getFilePath(type: 'template' | 'params' | 'output', templateName: string): string {
        const basePath = join(__dirname, '..', 'client', templateName);

        switch (type) {
            case 'template':
                return join(basePath, 'index.html.hbs');
            case 'params':
                return join(basePath, 'params.json');
            case 'output':
                return join(basePath, 'output.html');
            default:
                throw new Error(`Unknown file type: ${type}`);
        }
    }

    private async readFile(filePath: string): Promise<string> {
        try {
            return await fs.readFile(filePath, 'utf8');
        } catch (error) {
            console.error(`Error reading file ${filePath}: ${error.message}`);
            throw new Error(`Failed to read file: ${filePath}`);
        }
    }

    private async writeFile(filePath: string, content: string): Promise<void> {
        try {
            await fs.writeFile(filePath, content, 'utf8');
        } catch (error) {
            console.error(`Error writing to file ${filePath}: ${error.message}`);
            throw new Error(`Failed to write to file: ${filePath}`);
        }
    }

    private async copyFile(sourcePath: string, destinationPath: string): Promise<void> {
        try {
            await fs.copyFile(sourcePath, destinationPath);
        } catch (error) {
            console.error(`Error copying file from ${sourcePath} to ${destinationPath}: ${error.message}`);
            throw new Error('Failed to copy file');
        }
    }

    private async compileTemplate(templatePath: string): Promise<handlebars.TemplateDelegate> {
        const templateContent = await this.readFile(templatePath);
        return handlebars.compile(templateContent);
    }

    private async callAI(prompt: string, outputFormat: string = null): Promise<string> {
        try {
            const configuration = new GoogleGenerativeAI(this.AI_API_KEY);
            const model = configuration.getGenerativeModel({ model: this.AI_MODEL_ID });

            let fullPrompt = prompt;
            if (outputFormat) {
                fullPrompt = `${prompt}\nReturn the response in this format: ${outputFormat}`;
            }

            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error(`AI API error: ${error.message}`);
            throw new Error('Failed to get AI response');
        }
    }

    private async translateWithAI(content: Record<string, any>, targetLanguage: string): Promise<Record<string, any>> {
        if (targetLanguage === '' || targetLanguage === 'english') {
            return content;
        }

        try {
            const response = await this.callAI(
                `translate these keywords to ${targetLanguage}, output must be the same as the input but with the keywords translated, as JSON format: ${JSON.stringify(content)}`
            );

            return this.parseJsonResponse(response);
        } catch (error) {
            console.error(`Translation error: ${error.message}`);
            throw new Error('Failed to translate content');
        }
    }

    private async generateReviews(product: Product): Promise<Record<string, string>> {
        const response = await this.callAI(
            `generate 3 short positive reviews for this product: ${product.product} and this product descrition: ${product.description}. Output must have this shape as JSON format: { review1: "content", review2: "content", review3: "content" }`
        );

        return this.parseJsonResponse(response);
    }

    private async generateProductFeatures(product: Product): Promise<Record<string, string>> {
        const response = await this.callAI(
            `generate 3 features (not too long) to promote this product: ${product.product} with this description: ${product.description}. output must have this shape as JSON format: { feature1: "content", feature2: "content", feature3: "content" }`
        );

        return this.parseJsonResponse(response);
    }

    private parseJsonResponse(response: string): Record<string, any> {
        return JSON.parse(response.replace(/```(json|JSON)?|```/g, ''));
    }

    private parseSurvey(surveyString: string): Record<string, string> {
        const entries = surveyString.match(/"([^"]*)"/g)?.map((entry) => entry.replace(/"/g, '')) || [];
        const surveyData: Record<string, string> = {};

        var questionIndex = 1;
        var optionIndex = 1;

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

    private async loadTextsForMultipleTemplates(templateNames: string[]): Promise<Record<string, any>> {
        const texts = {};

        for (let i = 0; i < templateNames.length; i++) {
            const paramsPath = this.getFilePath('params', templateNames[i]);
            const templateContent = await this.readFile(paramsPath);
            const content = JSON.parse(templateContent);

            for (const key in content) {
                if (content.hasOwnProperty(key)) {
                    const newKey = i > 0 ? `${key}_${i + 1}` : key;
                    texts[newKey] = content[key];
                }
            }
        }

        return texts;
    }

    private customizeQuestionCount(texts: Record<string, any>, templateName: string): void {
        const questionCount = templateName === "offerwall" ? 5 : 8;

        for (let i = 1; i <= questionCount; i++) {
            const suffix = templateName === "config" ? `_2` : '';
            texts[`questionCount${i}${suffix}`] = `Question ${i} on ${questionCount}`;
        }
    }

    private customizeTemplateTexts(
        templateName: string,
        texts: Record<string, any>,
        product: Product,
        brand: Brand,
        config: Config
    ): void {
        const suffix = templateName === "config" ? "_2" : "";

        texts[`productComment${suffix}`] = "Usually not into these online surveys but this one was actually worth it. We're gonna make good use of this product, thank you!";

        switch (templateName) {
            case "tryetco":
                texts[`text1${suffix}`] = `Over ${config.currency}4,000,000 in Offers given out so far!`;
                texts[`text3${suffix}`] = `Dear ${brand.name} Shopper,`;
                texts[`text32${suffix}`] = `This website is not affiliated with or endorsed by ${brand.name} or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website.`;
                break;

            case "walp":
            case "config":
                texts[`text2${suffix}`] = `Win a ${product.product}!`;
                texts[`text5${suffix}`] = `What The Customers Say About This Product`;
                texts[`text3${suffix}`] = `Share your shopping experience with ${brand.name} and get a chance to win a ${product.product} worth over ${config.currency}${product.price}.`;
                texts[`text9${suffix}`] = `You've been selected to receive a ${product.product}`;
                texts[`text30${suffix}`] = `This website is not affiliated with or endorsed by ${brand.name} or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website. *Products offered on the last page require shipping and handling fees. See manufacturer's site for details as terms vary with offers. See important terms and conditions regarding this survey, website and advertisement.`;
                break;

            case "netf-lo":
                texts.text9 = `Do you want a 12 month trial for only 2${config.currency}?`;
                break;
        }
    }

    private async setupImages(geo: string, templateName: string, texts: Record<string, any> = null): Promise<void> {
        if (texts) {
            for (var i = 1; i <= 5; i++) {
                texts[`profilePic${i}`] = `${i}_${geo}.jpg`;
            }
        } else {
            try {
                for (var i = 1; i <= 5; i++) {
                    const sourcePath = path.join(__dirname, '..', 'client', 'images', `${i}_${geo}.jpg`);
                    const destPath = path.join(__dirname, '..', 'client', templateName, 'files', `${i}.jpg`);
                    await this.copyFile(sourcePath, destPath);
                }
            } catch (error) {
                console.error(`Error setting up profile images: ${error.message}`);
            }
        }

        try {
            const sourcePath = path.join(__dirname, '..', 'client', 'images', `flaglogo_${geo}.png`);
            const destPath = path.join(__dirname, '..', 'client', templateName, 'files', 'flaglogo.png');
            await this.copyFile(sourcePath, destPath);

            if (texts) {
                texts.flagLogo = `flaglogo_${geo}.png`;
            }
        } catch (error) {
            console.error(`Error copying flag logo for ${geo}: ${error.message}`);
        }
    }

    public async generateSurvey(product: Product, brand: Brand, survey: string, config: Config): Promise<string> {
        try {
            const templatePath = this.getFilePath('template', config.templateName);
            const outputPath = this.getFilePath('output', config.templateName);

            const template = await this.compileTemplate(templatePath);

            var texts: Record<string, any>;
            if (config.templateName === "config") {
                texts = await this.loadTextsForMultipleTemplates(["tryetco", "walp"]);
            } else {
                const paramsPath = this.getFilePath('params', config.templateName);
                const textsContent = await this.readFile(paramsPath);
                texts = JSON.parse(textsContent);
            }

            const [reviews, features] = await Promise.all([
                this.generateReviews(product),
                this.generateProductFeatures(product)
            ]);

            this.customizeQuestionCount(texts, config.templateName);

            const templatesToConfigure = [config.templateName];
            if (config.templateName === "config") {
                templatesToConfigure.push("tryetco");
            }

            for (const template of templatesToConfigure) {
                this.customizeTemplateTexts(template, texts, product, brand, config);
            }

            const parsedSurvey = this.parseSurvey(survey);
            parsedSurvey.surveyTitle = `${brand.name} Shopper Experience Survey`;

            const mergedData = {
                ...texts,
                ...product,
                ...brand,
                ...parsedSurvey,
                ...commentNamesByCountry[config.geo],
                ...reviews,
                ...features,
                ...config
            };

            const translatedData = await this.translateWithAI(mergedData, config.language);

            const html = template(translatedData);

            await this.writeFile(outputPath, html);

            await this.setupImages(config.geo, config.templateName, translatedData);

            return 'Survey generated successfully';
        } catch (error) {
            console.error(`Error generating survey: ${error.message}`);
            throw new Error(`Failed to generate survey: ${error.message}`);
        }
    }

    public async generate(prompt: string, outputFormat: string): Promise<string> {
        return this.callAI(prompt, outputFormat);
    }
}