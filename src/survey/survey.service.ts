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
    promo_price?: string;
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

interface Review {
  name: string;
  stars: string;
  comment: string;
  date: string;
  profilePic?: string;
  commentImage?: string;
}

export class SurveyService {
    private readonly AI_API_KEY = process.env.API_KEY;
    private readonly AI_MODEL_ID = 'gemini-2.5-flash';

    private getFilePath(type: 'template' | 'params' | 'output', templateName: string): string {
        const basePath = join(__dirname, '..', 'client', templateName);

        // console.log(join(basePath, 'params.json'));

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
            console.error('Content to translate:', JSON.stringify(content));
            throw new Error(`Failed to translate content: ${error.message}`);
        }
    }

    private async generateReviews(product: Product, templateName: String): Promise<Record<string, string>> {
        var response;
        if (templateName === "config_offerwall") {
            response = `{"review1": "I honestly didn't expect much when I filled out the survey, but a few weeks later, I got an email — I'd won a smartwatch! Super easy and totally worth it.", "review2": "The survey was quick and straightforward, and I ended up winning a drone! Best surprise ever. Definitely recommending this to friends.", "review3": "I gave my honest feedback about my shopping experience, and I got a free pair of AirPods. Crazy, right? Love it!"}`;
        } else {
            response = await this.callAI(
                `generate 3 short positive reviews for this product: ${product.product} and this product description: ${product.description}. Output must have this shape as JSON format: { review1: "content", review2: "content", review3: "content" }`
            );
        }

        try {
            return this.parseJsonResponse(response);
        } catch (error) {
            console.error('Error parsing reviews JSON:', error.message);
            console.error('Reviews response:', response);
            throw new Error(`Failed to parse reviews JSON: ${error.message}`);
        }
    }

    private async generateProductFeatures(product: Product): Promise<Record<string, string>> {
        const response = await this.callAI(
            `generate 3 features (not too long) to promote this product: ${product.product} with this description: ${product.description}. output must have this shape as JSON format: { feature1: "content", feature2: "content", feature3: "content" }`
        );

        try {
            return this.parseJsonResponse(response);
        } catch (error) {
            console.error('Error parsing product features JSON:', error.message);
            console.error('Features response:', response);
            throw new Error(`Failed to parse product features JSON: ${error.message}`);
        }
    }

    private async getProductGender(product: Product, language: string): Promise<Record<string, string>> {
        const response = await this.callAI(
            `Determine the grammatical gender of the product name '${product}' in the specified language '${language}'. The output should be a JSON object containing a key 'gender', with the value being either 'M' for masculine or 'F' for feminine. Please ensure the output follows the exact structure:
            Example output:

            { "gender": "m" }

            { "gender": "f" }

            Please handle edge cases, if applicable, and provide the correct gender based on the language's grammatical rules. NOT NEUTRAL GENDER`
        );

        try {
            return this.parseJsonResponse(response);
        } catch (error) {
            console.error('Error parsing product gender JSON:', error.message);
            console.error('Gender response:', response);
            throw new Error(`Failed to parse product gender JSON: ${error.message}`);
        }
    }

    private parseJsonResponse(response: string): Record<string, any> {
        try {
            // Clean the response by removing markdown code blocks and trimming
            let cleanedResponse = response.replace(/```(json|JSON)?|```/g, '').trim();
            
            // Remove any leading/trailing whitespace and normalize line endings
            cleanedResponse = cleanedResponse.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            
            // Log the response for debugging
            //console.log('AI Response to parse:', cleanedResponse);
            
            // Try to find JSON content if it's wrapped in other text
            const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                cleanedResponse = jsonMatch[0];
            }
            
            // Remove any potential BOM or invisible characters
            cleanedResponse = cleanedResponse.replace(/^\uFEFF/, '');
            
            return JSON.parse(cleanedResponse);
        } catch (error) {
            console.error('JSON parsing error:', error.message);
            console.error('Original response:', response);
            console.error('Cleaned response:', response.replace(/```(json|JSON)?|```/g, '').trim());
            
            // Try alternative parsing approaches
            try {
                // Try parsing just the JSON part if there's extra text
                const jsonStart = response.indexOf('{');
                const jsonEnd = response.lastIndexOf('}') + 1;
                if (jsonStart !== -1 && jsonEnd > jsonStart) {
                    const jsonPart = response.substring(jsonStart, jsonEnd);
                    console.log('Attempting to parse JSON part:', jsonPart);
                    return JSON.parse(jsonPart);
                }
            } catch (fallbackError) {
                console.error('Fallback JSON parsing also failed:', fallbackError.message);
            }
            
            throw new Error(`Invalid JSON response from AI: ${error.message}`);
        }
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

        for (var i = 0; i < templateNames.length; i++) {
            const paramsPath = this.getFilePath('params', templateNames[i]);
            const templateContent = await this.readFile(paramsPath);
            
            try {
                const content = JSON.parse(templateContent);

                for (const key in content) {
                    if (content.hasOwnProperty(key)) {
                        const newKey = i > 0 ? `${key}_${i + 1}` : key;
                        texts[newKey] = content[key];
                    }
                }
            } catch (error) {
                console.error(`Error parsing JSON in file ${paramsPath}:`, error.message);
                console.error('File content:', templateContent);
                throw new Error(`Invalid JSON in params file ${templateNames[i]}: ${error.message}`);
            }
        }

        return texts;
    }

    private customizeQuestionCount(texts: Record<string, any>, templateName: string): void {
        const questionCount = templateName === "offerwall" ? 5 : 8;

        for (let i = 1; i <= questionCount; i++) {
            const suffix = templateName === "config" ? `_2` : '';
            texts[`questionCount${i}`] = `Question ${i} on ${questionCount}`;
        }
    }

    private customizeTemplateTexts(
        templateName: string,
        texts: Record<string, any>,
        product: Product,
        brand: Brand,
        config: Config
    ): void {
        // const suffix = templateName === "config" ? "_2" : "";

        texts[`productComment`] = "Usually not into these online surveys but this one was actually worth it. We're gonna make good use of this product, thank you!";

        switch (templateName) {
            case "tryetco":
                texts[`text1`] = `Over ${config.currency}4,000,000 in Offers given out so far!`;
                texts[`text3`] = `Dear ${brand.name} Shopper,`;
                texts[`text32`] = `This website is not affiliated with or endorsed by ${brand.name} or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website.`;
                break;

            case "walp":
                texts[`text2_2`] = `Win a ${product.product}!`;
                texts[`text5_2`] = `What The Customers Say About This Product`;
                texts[`text3_2`] = `Share your shopping experience with ${brand.name} and get a chance to win a ${product.product} worth over ${config.currency}${product.price}.`;
                texts[`text9_2`] = `You've been selected to receive a ${product.product}`;
                texts[`text30_2`] = `This website is not affiliated with or endorsed by ${brand.name} or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website. *Products offered on the last page require shipping and handling fees. See manufacturer's site for details as terms vary with offers. See important terms and conditions regarding this survey, website and advertisement.`;
                break;

            case "hrblock":
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
            if (templateName !== "config" && templateName !== "config_tt" && templateName !== "config_offerwall") {
                console.log("Copying flag logo...");
                const sourcePath = path.join(__dirname, '..', 'client', 'images', `flaglogo_${geo}.png`);
                const destPath = path.join(__dirname, '..', 'client', templateName, 'files', 'flaglogo.png');
                await this.copyFile(sourcePath, destPath);
            }


            if (texts) {
                texts.flagLogo = `flaglogo_${geo}.png`;
            }
        } catch (error) {
            console.error(`Error copying flag logo for ${geo}: ${error.message}`);
        }
    }

    public async generateSurvey(product: Product, brand: Brand, survey: string, config: Config, reviews2: Review[]): Promise<string> {
        try {
            const templatePath = this.getFilePath('template', config.templateName);
            const outputPath = this.getFilePath('output', config.templateName);

            const template = await this.compileTemplate(templatePath);

            var texts: Record<string, any>;
            if (config.templateName === "config" || config.templateName === "config_offerwall") {
                texts = await this.loadTextsForMultipleTemplates(["tryetco", "walp", "hrblock"]);
            } else {
                const paramsPath = this.getFilePath('params', config.templateName);
                const textsContent = await this.readFile(paramsPath);
                try {
                    texts = JSON.parse(textsContent);
                } catch (error) {
                    console.error(`Error parsing JSON in file ${paramsPath}:`, error.message);
                    console.error('File content:', textsContent);
                    throw new Error(`Invalid JSON in params file ${config.templateName}: ${error.message}`);
                }
            }

            let reviews = {};
            const features = await this.generateProductFeatures(product);
            
            // Only generate reviews if templateName is "config"
            if (config.templateName !== "config_tt") {
                reviews = await this.generateReviews(product, config.templateName);
            }

            this.customizeQuestionCount(texts, config.templateName);

            const templatesToConfigure = [];

            if (config.templateName === "config" || config.templateName === "config_offerwall") {
                templatesToConfigure.push("tryetco");
                templatesToConfigure.push("walp");
                templatesToConfigure.push("hrblock");
            } else if (config.templateName === "config_tt") {
                templatesToConfigure.push("us-fdd");
            }

            for (const template of templatesToConfigure) {
                this.customizeTemplateTexts(template, texts, product, brand, config);
            }

            const parsedSurvey = this.parseSurvey(survey);
            parsedSurvey.surveyTitle = `${brand.name} Shopper Experience Survey`;

            if (config.templateName === "config_offerwall") {
                parsedSurvey.productImage = "./files/feature.png";
                parsedSurvey.product = "Exclusive Reward";
                parsedSurvey.isOfferwall = "true";
            }

            const mergedData = {
                ...texts,
                ...product,
                ...brand,
                ...parsedSurvey,
                ...commentNamesByCountry[config.geo],
                ...features,
                ...config,
                ...reviews,
                reviews2
            };

            const translatedData = await this.translateWithAI(mergedData, config.language);

            const productGender = await this.getProductGender(translatedData.product, config.language);

            translatedData.gender = productGender.gender;

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