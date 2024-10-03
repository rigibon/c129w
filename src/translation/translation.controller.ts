import { BadRequestException, Controller, Get, Post, Query, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { BrandsService } from 'src/brands/brands.service';

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
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Req() req) {
    if (!file) {
      throw new BadRequestException('File is missing');
    }

    return { message: 'File uploaded successfully', file };
  }

  @Post('generate')
  async generate(@Query('translateTexts') translateTexts: string, @Query('language') language: string, @Req() req) {
    const { brand } = req.body;

    const config = {
      folderName: 'us-ultcurl',
      wallId: '',
    };

    const productData = {
      product: 'Kitgo 137 Piece Automotive Safety Kit',
      description: 'Protect Your Safety On Road: We Provide This Compact And Practical Roadside Emergency Kit,Durable Tools That Are Designed For Top Performance And Lasting Quality.',
      price: '$59.99',
      productImage: './files/productImage.png',
      commentImage1: './files/commentImage1.jpg',
      commentImage2: './files/commentImage2.jpg',
    };

    const brandData = {
      backgroundImage: './files/backgroundImage.png',
      brand: brand.name,
      primaryColor: brand.primaryColor,
      secondaryColor: brand.secondaryColor,
      hoverPrimaryColor: brand.primaryColor,
      // brand: 'Norauto',
      // primaryColor: 'rgb(0, 42, 108)',
      // hoverPrimaryColor: 'rgb(0, 42, 108)',
      // secondaryColor: 'rgb(0, 42, 108)',
      brandLogo: './files/brandLogo.png',
      favicon: './files/favicon.png',
    };

    const translate = translateTexts === 'true';
    await this.translationService.generateHtmlWithTranslations(translate, language, brandData, productData, config);
    return { message: 'HTML file generated successfully' };
  }

  @Get('survey')
  async generateSurvey() {}
}
