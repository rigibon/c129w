import { Injectable } from '@nestjs/common';
import { promises as fs, createWriteStream } from 'fs';
import * as handlebars from 'handlebars';
import { translate } from 'google-translate-api-x';
import * as path from 'path';
import * as archiver from 'archiver';

@Injectable()
export class TranslationService {
  private readonly templateFilePath = path.join(
    __dirname,
    '..',
    'client',
    'tryetco',
    'index.html.hbs',
  );
  private readonly textsFilePath = path.join(
    __dirname,
    '..',
    'client',
    'tryetco',
    'params.json',
  );

  async generateHtmlWithTranslations(
    translateTexts: boolean,
    language: string,
    brandData: any,
    productData: any,
    configData: any,
  ) {
    const templateContent = await fs.readFile(this.templateFilePath, 'utf8');
    const template = handlebars.compile(templateContent);

    const texts = JSON.parse(await fs.readFile(this.textsFilePath, 'utf8'));
    texts.text3 = "Dear " + brandData.brand + " Shopper,";
    texts.text32 = "This website is not affiliated with or endorsed by " + brandData.brand + " or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website.";
    // const configuration = JSON.parse(await fs.readFile(this.configFilePath, 'utf8'));

    console.log(configData);

    if (configData.language !== "" && configData.language !== "en") {
      const translationPromises = this.getTranslationPromises(texts, configData.language);

      const translations = await Promise.all(translationPromises);
      let i = 0;
      for (const key in texts) {
        if (texts.hasOwnProperty(key)) {
          texts[key] = translations[i];
          i++;
        }
      }
    }

    // const data = { ...texts, ...configuration };
    const data = { ...texts, ...brandData, ...productData, ...configData };
    const html = template(data);

    const baseFilesPath = path.join(
      __dirname,
      '..',
      'client',
      'tryetco',
      'files',
    );

    const outputFilePath = path.join(
      __dirname,
      '..',
      'client',
      'tryetco',
      'output.html',
    );

    await fs.writeFile(outputFilePath, html, 'utf-8');
  }

  private getTranslationPromises(
    textArray: Record<string, string>,
    language: string,
  ) {
    return Object.keys(textArray).map((key) => {
      if (key === 'comments') return Promise.resolve('');
      const property = textArray[key];
      return translate(property, {
        to: language,
        rejectOnPartialFail: false,
        forceTo: true,
        forceBatch: false,
      }).then((res) => res.text);
    });
  }
}
