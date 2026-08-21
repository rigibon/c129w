import { Injectable } from '@nestjs/common';
import { promises as fs, createWriteStream } from 'fs';
import * as handlebars from 'handlebars';
import { translate } from 'google-translate-api-x';
import * as path from 'path';
import * as archiver from 'archiver';
import { commentNamesByCountry } from './commentNames';
import { AIProviderService } from '../ai-provider/ai-provider.service';

@Injectable()
export class TranslationService {
  private readonly templateFilePath = path.join(__dirname, '..', 'client', 'index.html.hbs');
  private readonly textsFilePath = path.join(__dirname, '..', 'client', 'params.json');

  constructor(private aiProvider: AIProviderService) {}

  async generateHtmlWithTranslations(translateTexts: boolean, language: string, brandData: any, productData: any, configData: any, survey: any) {
    const templateContent = await fs.readFile(this.templateFilePath, 'utf8');
    const template = handlebars.compile(templateContent);

    var texts = JSON.parse(await fs.readFile(this.textsFilePath, 'utf8'));
    texts.text1 = 'Over ' + configData.currency + '4,000,000 in Offers given out so far!';
    texts.text3 = 'Dear ' + brandData.name + ' Shopper,';
    texts.text32 =
      'This website is not affiliated with or endorsed by ' +
      brandData.name +
      ' or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website.';

    texts.questionCount1 = 'Question 1 on 8';
    texts.questionCount2 = 'Question 2 on 8';
    texts.questionCount3 = 'Question 3 on 8';
    texts.questionCount4 = 'Question 4 on 8';
    texts.questionCount5 = 'Question 5 on 8';
    texts.questionCount6 = 'Question 6 on 8';
    texts.questionCount7 = 'Question 7 on 8';
    texts.questionCount8 = 'Question 8 on 8';

    var newSurvey = { ...survey, surveyTitle: `${brandData.name} Shopper Experience Survey` };

    texts.montharray = 'January, February, March, April, May, June, July, August, September, October, November, December';

    var newData = { ...texts, ...newSurvey };

    if (configData.language !== '' && configData.language !== 'english') {
      productData.description = await this.translateKeyword(productData.description, configData.language);
      const { toTranslate, toKeep } = this.filterTranslatableFields(newData);
      let translated: any = await this.translateKeywords(JSON.stringify(toTranslate), configData.language);
      translated = JSON.parse(translated.replace(/```/g, '').replace(/JSON/g, '').replace(/json/g, ''));
      newData = { ...toKeep, ...translated };
      console.log(newData);
    }

    const data = { ...newData, ...brandData, ...productData, ...configData, ...commentNamesByCountry[configData.geo] };

    const html = template(data);

    const baseFilesPath = path.join(__dirname, '..', 'client', 'images');

    const outputFilePath = path.join(__dirname, '..', 'client', 'tryetco', 'output.html');

    await fs.writeFile(outputFilePath, html, 'utf-8');

    const tempFilePath = path.join(__dirname, '..', 'client', 'images', `flaglogo_${configData.geo}.png`);
    const newFilePath = path.join(__dirname, '..', 'client', 'tryetco', 'files', 'flaglogo.png');

    try {
      const response = await fs.copyFile(tempFilePath, newFilePath);

      for (var i = 1; i <= 5; i++) {
        const tempFilePathImage = path.join(__dirname, '..', 'client', 'images', `${i}_${configData.geo}.jpg`);
        const newFilePathImage = path.join(__dirname, '..', 'client', 'tryetco', 'files', `${i}.jpg`);

        await fs.copyFile(tempFilePathImage, newFilePathImage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  datehax(montharray, geo) {
    var mydate = new Date();
    mydate.setDate(mydate.getDate());
    var year = mydate.getFullYear();
    if (year < 1000) year += 1900;
    var day = mydate.getDay();
    var month = mydate.getMonth();
    var daym = mydate.getDate();
    if (daym < 10) daym = Number('0') + daym;
    var dayarray = Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    //  var montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    //var dayarray = Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
    //var montharray = new Array("janvier","février","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","décembre");

    // var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
    // var montharray = new Array("Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December")
    return '' + montharray[month] + ' ' + daym + ', ' + year + '';
  }

  private filterTranslatableFields(data: any): { toTranslate: Record<string, string>; toKeep: Record<string, any> } {
    const skipKeys = new Set([
      'mainColor', 'mainColor_3', 'secondaryColor', 'headerColor', 'brandLogo', 'favicon',
      'backgroundImage', '_id', 'wallID', 'wallID2', '__v', 'price', 'promo_price',
      'productImage', 'commentImage1', 'commentImage2', 'flagLogo', 'flagLogo_3',
      'langTag', 'geo', 'currency', 'folderName', 'templateName', 'language',
      'countryName', 'surveyQuestions',
    ]);
    const toTranslate: Record<string, string> = {};
    const toKeep: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (skipKeys.has(key) || typeof value !== 'string') {
        toKeep[key] = value;
        continue;
      }
      if (/\.(png|jpg|jpeg|gif|ico|svg|avif|jfif|webp|x-icon)/i.test(value)) { toKeep[key] = value; continue; }
      if (/^#[0-9a-fA-F]{3,8}$/.test(value) || /^rgb\(/i.test(value)) { toKeep[key] = value; continue; }
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value)) { toKeep[key] = value; continue; }
      if (value.trim().startsWith('$')) { toKeep[key] = value; continue; }
      if (key.startsWith('commentName') || key.startsWith('commentImage')) { toKeep[key] = value; continue; }
      toTranslate[key] = value;
    }
    return { toTranslate, toKeep };
  }

  private async translateKeywords(keywords: any, language: string) {
    const prompt = `translate these keywords to ${language}, output must be the same as the input but with the keywords translated, as JSON format: ${keywords}`;
    return await this.aiProvider.sendMessage(prompt);
  }

  private async getTranslationPromises(textArray: Record<string, string>, language: string) {
    try {
      const batchSize = 5;
      const translations = [];

      for (var i = 0; i < Object.keys(textArray).length; i += batchSize) {
        const batch = Object.keys(textArray)
          .slice(i, i + batchSize)
          .map((key) => {
            if (key === 'comments') return Promise.resolve('');

            const property = textArray[key];
            return translate(property, {
              to: language,
              forceTo: true,
            }).then((translationResult) => translationResult.text);
          });

        const batchResults = await Promise.all(batch);
        translations.push(...batchResults);
      }

      const result = Object.keys(textArray).reduce((acc, key, index) => {
        acc[key] = translations[index];
        return acc;
      }, {});

      return result;
    } catch (error) {
      console.error('Translation error:', error);
    }
  }

  private async translateKeyword(keyword: string, language: string) {
    const prompt = `translate this string to ${language}, output must be only the string translated, nothing else: ${keyword}`;
    return await this.aiProvider.sendMessage(prompt);
  }
}