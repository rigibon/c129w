import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as handlebars from 'handlebars';
import { translate } from 'google-translate-api-x';
import * as path from 'path';
import * as cheerio from "cheerio";

@Injectable()
export class TranslationService {
    private readonly templateFilePath = path.join(__dirname, '..', '..', 'client', 'tryetco', 'index.html.hbs');
    private readonly textsFilePath = path.join(__dirname, '..', '..', 'client', 'tryetco', 'params.json');
    // private readonly configFilePath = path.join(__dirname, '..', '..', 'client', 'tryetco', 'config.json');
    // private readonly outputFilePath = './out.html';

    async generateHtmlWithTranslations(translateTexts: boolean, language: string) {
        const templateContent = await fs.readFile(this.templateFilePath, 'utf8');
        const template = handlebars.compile(templateContent);

        const texts = JSON.parse(await fs.readFile(this.textsFilePath, 'utf8'));
        // const configuration = JSON.parse(await fs.readFile(this.configFilePath, 'utf8'));

        // const translationPromises = this.getTranslationPromises(texts, language);

        // if (translateTexts) {
        //     const translations = await Promise.all(translationPromises);
        //     let i = 0;
        //     for (const key in texts) {
        //         if (texts.hasOwnProperty(key)) {
        //             texts[key] = translations[i];
        //             i++;
        //         }
        //     }
        // }

        // const data = { ...texts, ...configuration };
        const data = { ...texts };
        const html = template(data);

        // console.log(html);

        const outputFilePath = path.join(__dirname, '..', '..', "client", "tryetco", 'output.html');

        await fs.writeFile(outputFilePath, html, 'utf-8');

        // const output = await fs.readFile(outputFilePath, 'utf-8');
        // const $ = cheerio.load(output);

        // const scriptTag = $('script').filter(function () {
        //     return $(this).html().includes('var qtexxtt =');
        // });

        // const scriptContent = scriptTag.html();
        // const originalArray = this.extractArrayFromScript(scriptContent);

        // const translatedArray = await this.translateArray(originalArray, "es");

        // const translatedArrayString = JSON.stringify(translatedArray, null, 4);
        // const newScriptContent = `var qtexxtt = ${translatedArrayString};`;

        // scriptTag.html(newScriptContent);

        // await fs.writeFile(outputFilePath, $.html(), 'utf-8');
    }

    private getTranslationPromises(textArray: Record<string, string>, language: string) {
        return Object.keys(textArray).map((key) => {
            if (key === 'comments') return Promise.resolve('');
            const property = textArray[key];
            return translate(property, { to: language, rejectOnPartialFail: false, forceTo: true, forceBatch: false })
                .then((res) => res.text);
        });
    }

    extractArrayFromScript(scriptContent) {
        const match = scriptContent.match(/var qtexxtt\s*=\s*\[(.*?)\];/s);
        if (match) {
            const arrayContent = match[1];
            const jsonString = `[${arrayContent.replace(/`([^`]*)`/g, '"$1"').replace(/(?:,\s*|\s*)$/, '')}]`;
            try {
                return JSON.parse(jsonString);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return null;
            }
        }
        return null;
    }

    async translateArray(array, targetLang) {
        return Promise.all(array.map(async (text) => {
            try {
                const res = await translate(text, { to: targetLang });
                // @ts-ignore
                return res.text;
            } catch (error) {
                console.error(`Error translating: ${text}`, error);
                return text; // Return original text if translation fails
            }
        }));
    }
}
