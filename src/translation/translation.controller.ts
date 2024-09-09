import { Controller, Get, Query } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Controller('translate')
export class TranslationController {
    constructor(private readonly translationService: TranslationService) { }

    @Get('generate')
    async generate(
        @Query('translateTexts') translateTexts: string,
        @Query('language') language: string,
    ) {
        const translate = translateTexts === 'true';
        await this.translationService.generateHtmlWithTranslations(translate, language || 'fr');
        return { message: 'HTML file generated successfully' };
    }
}
