import { BadRequestException, Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { BrandsService } from 'src/brands/brands.service';
import { promises as fs, createWriteStream } from 'fs';
import * as archiver from 'archiver';
import axios from 'axios';
import OpenAI from "openai";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { translate } from 'google-translate-api-x';

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
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req, @Res() res) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files were uploaded');
    }

    try {
      const newDirPath = path.join(__dirname, '..', 'client', req.body.directory);

      for (const file of files) {
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

  @Post("translation")
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

  @Post('generate')
  async generate(@Query('translateTexts') translateTexts: string, @Query('language') language: string, @Req() req, @Res() res) {
    const { productData, brandData, configData, survey } = req.body;

    const parsedSurvey = this.parseSurvey(survey);

    const templatePath = path.join(
      __dirname,
      '..',
      'client',
      'tryetco'
    );
    const outputFilePath = path.join(
      __dirname,
      '..',
      'client'
    );

    const baseFilesPath = path.join(
      __dirname,
      '..',
      'client',
      'tryetco',
      'files',
    );

    const translate = translateTexts === 'true';
    await this.translationService.generateHtmlWithTranslations(translate, language, brandData, productData, configData, parsedSurvey);

    const zipPath = path.join(outputFilePath, "creative.zip");
    
    await this.createZip(templatePath, zipPath)
      .then(async () => {
        res.download(zipPath, "final.zip", async (err) => {
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
            } catch (error) {
            }
          }

          if (err) {
            res.status(404).send("File not found");
          }
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error creating zip." });
      });

    return { message: 'HTML file generated successfully' };
  }

  async createZip(sourceFolder, outPath) {
    return new Promise((resolve, reject) => {
      const output = createWriteStream(outPath);
      const archive = archiver("zip");

      output.on("close", () => {
        resolve(null);
      });

      archive.on("error", (err) => {
        reject(err);
      });

      archive.pipe(output);
      archive.directory(sourceFolder, false);
      archive.finalize();
    });
  }

  private parseSurvey(surveyString: string): Record<string, string> {
    const entries = surveyString.match(/"([^"]*)"/g)?.map(entry => entry.replace(/"/g, '')) || [];
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

  @Post('survey')
  async generateSurvey(@Req() req) {
    const { brand, product } = req.body;

    const API_KEY = 'AIzaSyD_YOrEpX3fm8WR6lru0IK7_-MOkfkk_g4';
    const URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

    const configuration = new GoogleGenerativeAI(API_KEY);

    const modelId = "gemini-1.5-flash";
    const model = configuration.getGenerativeModel({ model: modelId });

    const chat = model.startChat();

    const result = await chat.sendMessage(`change these questions to fit a shopper experience survey about ${brand} and a ${product} as prize, The output must ONLY contain the strings (don't forget to include the "" and ,) NOTHING MORE:
          "How often do you visit CVS for your shopping needs?",
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
    "Not at all likely"
          `);
    const response = await result.response;
    return response.text();

    // const { brand, product } = req.body;

    // const API_KEY = "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"

    // const openai = new OpenAI({ apiKey: API_KEY });

    // const completion = await openai.chat.completions.create({
    //     model: "gpt-4o",
    //     messages: [
    //       { role: "user", content: `change these questions to fit a shopper experience survey about ${brand} and a ${product} as prize, The output must ONLY containg the strings, NOTHING MORE:
    //       "How often do you visit CVS for your shopping needs?",
    // "Multiple times a week",
    // "Once a week",
    // "A few times a month",
    // "Rarely or never",
    // "What primarily drives your choice to shop at CVS?",
    // "Convenience of location",
    // "Product selection",
    // "Prices and deals",
    // "Loyalty rewards program",
    // "When seeing ads from CVS, how do you typically respond?",
    // "I look for items I need",
    // "I browse if there's a good deal",
    // "I consider visiting if there's a promo",
    // "I usually ignore the ads",
    // "If you won a Medicare Kit from CVS, how would it change your view of the CVS?",
    // "Significantly more positive",
    // "Somewhat more positive",
    // "No change",
    // "More negative",
    // "How familiar are you with the components of a Medicare Kit?",
    // "Very familiar",
    // "Somewhat familiar",
    // "A little familiar",
    // "Not familiar at all",
    // "How likely are you to use a Medicare Kit if you received one from CVS?",
    // "Very likely",
    // "Somewhat likely",
    // "Unlikely",
    // "I would not use it",
    // "In terms of health and wellness products, how well do you think CVS meets your needs?",
    // "Exceeds my needs",
    // "Meets my needs well",
    // "Adequately meets my needs",
    // "Does not meet my needs",
    // "How likely are you to participate in future promotions or surveys from CVS?",
    // "Very likely",
    // "Somewhat likely",
    // "Not very likely",
    // "Not at all likely"
    //       `,
    //       }
    //     ],
    // });

    // // console.log(completion.choices[0].message.content);
    // // console.log(completion.choices[0].message.content[0]);

    // return completion.choices[0].message.content;

    // const arrayMatch = completion.choices[0].message.content.match(/\[([^\]]*)\]/);

    // if (arrayMatch) {
    //     const arrayString = arrayMatch[1];
    //     const shopperSurveyQuestions = arrayString.split(',').map(item => item.trim().replace(/(^"|"$)/g, ``));

    //     console.log(shopperSurveyQuestions);
    // } else {
    //     console.log('No array found in the input string.');
    // }
  }
}
