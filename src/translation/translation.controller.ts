import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TranslationService } from './translation.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { BrandsService } from 'src/brands/brands.service';

@Controller('translate')
export class TranslationController {
  constructor(
    private readonly translationService: TranslationService,
    private readonly brandsService: BrandsService,
  ) {}

  @Post('generate')
  @UseInterceptors(FilesInterceptor('images'))
  async generate(
    @Query('translateTexts') translateTexts: string,
    @Query('language') language: string,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const brands = await this.brandsService.findAll();

    const brandData = {
      backgroundImage: './files/' + images[0].originalname,
      productImage: './files/' + images[1].originalname,
      commentImage1: './files/' + images[2].originalname,
      commentImage2: './files/' + images[3].originalname,
      primaryColor: brands[0].primaryColor,
      hoverPrimaryColor: brands[0].hoverPrimaryColor,
      secondaryColor: brands[0].secondaryColor,
      brandLogo: brands[0].brandLogo,
      favicon: brands[0].favicon,
    };

    const translate = translateTexts === 'true';
    await this.translationService.generateHtmlWithTranslations(
      translate,
      language || 'fr',
      brandData,
    );
    return { message: 'HTML file generated successfully' };
  }

  @Get('survey')
  async generateSurvey() {}
}
