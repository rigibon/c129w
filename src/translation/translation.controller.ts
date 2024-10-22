import { BadRequestException, Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { BrandsService } from 'src/brands/brands.service';
import { promises as fs, createWriteStream } from 'fs';
import * as archiver from 'archiver';

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
        await fs.rename(tempFilePath, newFilePath);
      }

      res.json({ message: 'Files uploaded and moved successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while processing the files.' });
    }

    return { message: 'Files uploaded successfully', files };
  }

  @Post('generate')
  async generate(@Query('translateTexts') translateTexts: string, @Query('language') language: string, @Req() req, @Res() res) {
    const { productData, brandData, configData } = req.body;

    // const configData = {
    //   folderName: 'us-ultcurl',
    //   wallId: '',
    // };

    // const productData = {
    //   product: 'Kitgo 137 Piece Automotive Safety Kit',
    //   description: 'Protect Your Safety On Road: We Provide This Compact And Practical Roadside Emergency Kit,Durable Tools That Are Designed For Top Performance And Lasting Quality.',
    //   price: '$59.99',
    //   productImage: 'productImage.png',
    //   commentImage1: 'commentImage1.jpg',
    //   commentImage2: 'commentImage2.jpg',
    // };

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

    // const brandData = {
    //   backgroundImage: 'backgroundImage.webp',
    //   brand: "Walmart",
    //   primaryColor: "#0071ce",
    //   secondaryColor: "#ffc220",
    //   hoverPrimaryColor: "#0071ce",
    //   brandLogo: 'brandLogo.png',
    //   favicon: 'favicon.png',
    // };

    const baseFilesPath = path.join(
      __dirname,
      '..',
      'client',
      'tryetco',
      'files',
    );

    const translate = translateTexts === 'true';
    await this.translationService.generateHtmlWithTranslations(translate, language, brandData, productData, configData);

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
              await fs.unlink(fileToRemove);
              console.log(`Removed file: ${fileToRemove}`);
            } catch (error) {
              console.error(`Error removing file ${fileToRemove}:`, error);
            }
          }

          if (err) {
            console.error("Error downloading file:", err);
            res.status(404).send("File not found");
          }
        });
      })
      .catch((error) => {
        console.error("Error creating zip:", error);
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

  @Get('survey')
  async generateSurvey() {}
}
