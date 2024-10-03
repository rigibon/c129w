import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as handlebars from 'handlebars';
import { translate } from 'google-translate-api-x';
import * as path from 'path';
import * as cheerio from 'cheerio';
const { G4F } = require('g4f');

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

  survey: string[] = [];
  // private readonly configFilePath = path.join(__dirname, '..', '..', 'client', 'tryetco', 'config.json');
  // private readonly outputFilePath = './out.html';

  async generateHtmlWithTranslations(
    translateTexts: boolean,
    language: string,
    brandData: any,
    productData: any,
    config: any,
  ) {
    const templateContent = await fs.readFile(this.templateFilePath, 'utf8');
    const template = handlebars.compile(templateContent);

    const texts = JSON.parse(await fs.readFile(this.textsFilePath, 'utf8'));
    // const configuration = JSON.parse(await fs.readFile(this.configFilePath, 'utf8'));

    if (translateTexts) {
      console.log('A');
      const translationPromises = this.getTranslationPromises(texts, language);

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
    const data = { ...texts, ...brandData, ...productData, ...config };
    const html = template(data);

    // console.log(html);

    const outputFilePath = path.join(
      __dirname,
      '..',
      'client',
      'tryetco',
      'output.html',
    );

    const scriptFilePath = path.join(
      __dirname,
      '..',
      'client',
      'tryetco',
      'files',
      'script-test.js',
    );

    await fs.writeFile(outputFilePath, html, 'utf-8');

    const output = await fs.readFile(outputFilePath, 'utf-8');
    const $ = cheerio.load(output);

    const scriptTag = $('script').filter(function () {
      return $(this).html().includes('var qtexxtt =');
    });

    const scriptContent = scriptTag.html();
    // const originalArray = this.extractArrayFromScript(scriptContent);
    const originalArray = [];

    const translatedArray = await this.translateArray(
      originalArray,
      'es',
      brandData.brand,
      productData.product,
    );

    const translatedArrayString = JSON.stringify(translatedArray, null, 4);
    const newScriptContent = `var qtexxtt = ${translatedArrayString};`;

    scriptTag.html(newScriptContent);

    const content = `
      document.getElementById('text3').innerText = \`Dear ${brandData.brand} Shopper,\`;
      document.getElementById('text32').innerText = \`This website is not affiliated with or endorsed by ${brandData.brand} or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website.\`;

      var qtexxtt = ${translatedArrayString};

      const qhed = document.querySelectorAll(".qeus-head") || [];
      const ques = document.querySelectorAll(".qeus-text") || [];
      const qnum = document.querySelectorAll(".qeus-numb") || [];

      for (var qn = 0; qn < qnum.length; qn++) {
          qhed[qn].innerText = \`${brandData.brand} Shopper Experience Survey\`;
          qnum[qn].innerText = "Question " + (qn + 1) + " on " + qnum.length + ":";
      }

      var dsq = 0;
      while (dsq < qtexxtt.length) {
          ques[dsq].innerText = qtexxtt[dsq];
          dsq++;
      }
    `;

    await fs.writeFile(scriptFilePath, content, 'utf8');

    await fs.writeFile(outputFilePath, $.html(), 'utf-8');
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

  async translateArray(array, targetLang, brand, prize) {
    const g4f = new G4F();

    const messages = [
      {
        role: 'user',
        content: `
      Change these questions and options to fit a survey about ${brand} and a ${prize} as the prize:
          When you think of Walmart, which word comes to mind first?,
          Reliability,
          Innovation,
          Affordability,
          Variety,
          How do Walmart advertisements influence your shopping decisions?,
          Strongly influence,
          Somewhat influence,
          Rarely influence,
          No influence at all,
          What is your primary reason for shopping at Walmart?,
          Product quality,
          Customer service,
          Store ambiance,
          Loyalty rewards,
          How often do you use backpacks in your everyday tasks?,
          Daily,
          Weekly,
          Monthly,
          Rarely,
          What feature of the YETI Backpack Soft Cooler excites you the most?,
          Large main compartment,
          Durability,
          Portability,
          Design and appearance,
          How likely are you to participate in a Walmart promotional giveaway?,
          Very likely,
          Somewhat likely,
          Not very likely,
          Not at all likely,
          If you won the YETI Backpack Soft Cooler, how would you use it?,
          For daily use,
          On weekend adventures and trips,
          As a gift for someone else,
          Not sure/I wouldn't use it,
          Which aspect of Walmart shopping experience would you most like to see improved?,
          Online shopping platform,
          In-store product arrangement,
          Customer service responsiveness,
          Pricing and discounts,
          How does owning a comprehensive backpack like the YETI Backpack Soft Cooler align with your lifestyle?,
          Perfectly aligns,
          Somewhat aligns,
          Barely aligns,
          Does not align at all,
          After hearing about the YETI Backpack Soft Cooler giveaway, how does your perception of Walmart change?,
          Much more positive,
          Slightly more positive,
          No change,
          Less positive,
      Output as array of strings
      `,
      },
    ];

    const newSurvey = await g4f.chatCompletion(messages);

    return JSON.parse(newSurvey);

    // g4f.chatCompletion(messages).then((result) => {
    //   this.survey = JSON.parse(result);

    //   return Promise.all(
    //     this.survey.map(async (text) => {
    //       try {
    //         // const res = await translate(text, { to: targetLang });
    //         // // @ts-ignore
    //         // return res.text;
    //         return text;
    //       } catch (error) {
    //         console.error(`Error translating: ${text}`, error);
    //         return text; // Return original text if translation fails
    //       }
    //     }),
    //   );
    // });
  }
}
