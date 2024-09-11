import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TranslationService } from './translation.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';

@Controller('translate')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post('generate')
  @UseInterceptors(FileInterceptor('file'))
  async generate(
    @Query('translateTexts') translateTexts: string,
    @Query('language') language: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const backgroundImage = { backgroundImage: './files/' + file.filename };
    const translate = translateTexts === 'true';
    await this.translationService.generateHtmlWithTranslations(
      translate,
      language || 'fr',
      backgroundImage,
    );
    return { message: 'HTML file generated successfully' };
  }
}
