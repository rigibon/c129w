import { Injectable } from '@nestjs/common';
import { promises as fs, createWriteStream } from 'fs';
import * as handlebars from 'handlebars';
import { translate } from 'google-translate-api-x';
import * as path from 'path';
import * as archiver from 'archiver';
import { commentNamesByCountry } from './commentNames';

@Injectable()
export class TranslationService {
  private readonly templateFilePath = path.join(
    __dirname,
    '..',
    'client',
    'index.html.hbs',
  );
  private readonly textsFilePath = path.join(
    __dirname,
    '..',
    'client',
    'params.json',
  );

  async generateHtmlWithTranslations(
    translateTexts: boolean,
    language: string,
    brandData: any,
    productData: any,
    configData: any,
    survey: any
  ) {
    const templateContent = await fs.readFile(this.templateFilePath, 'utf8');
    const template = handlebars.compile(templateContent);

    const texts = JSON.parse(await fs.readFile(this.textsFilePath, 'utf8'));
    texts.text1 = "Over " + configData.currency + "4,000,000 in Offers given out so far!";
    texts.text3 = "Dear " + brandData.name + " Shopper,";
    texts.text32 = "This website is not affiliated with or endorsed by " + brandData.name + " or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website.";

    const newSurvey = { ...survey, surveyTitle: `${brandData.name} Shopper Experience Survey` }; 

    texts.montharray = "January, February, March, April, May, June, July, August, September, October, November, December";

    const newData = { ...texts, ...newSurvey };
    
    if (configData.language !== "" && configData.language !== "en") {
      const translationPromises = this.getTranslationPromises(newData, configData.language);

      const translations = await Promise.all(translationPromises);
      let i = 0;
      for (const key in newData) {
        if (newData.hasOwnProperty(key)) {
          newData[key] = translations[i];
          i++;
        }
      }

      console.log(newData);
    }

    // const data = { ...texts, ...configuration };
    const data = { ...newData, ...brandData, ...productData, ...configData, ...commentNamesByCountry[configData.geo] };

    const html = template(data);

    const baseFilesPath = path.join(
      __dirname,
      '..',
      'client',
      'images',
    );

    const outputFilePath = path.join(
      __dirname,
      '..',
      'client',
      'tryetco',
      'output.html',
    );

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
    var mydate = new Date()
    mydate.setDate(mydate.getDate());
    var year = mydate.getFullYear()
    if (year < 1000)
        year += 1900
    var day = mydate.getDay()
    var month = mydate.getMonth()
    var daym = mydate.getDate()
    if (daym < 10)
        daym = Number("0") + daym;
    var dayarray = Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    //  var montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    
    //var dayarray = Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
    //var montharray = new Array("janvier","février","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","décembre");
    
    // var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
    // var montharray = new Array("Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December")
    return "" + montharray[month] + " " + daym + ", " + year + "";
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
