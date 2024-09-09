import { Module } from '@nestjs/common';
import { TranslationService } from './translation/translation.service';
import { TranslationController } from './translation/translation.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: path.join(__dirname, '..', 'client'),
  }),],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class AppModule { }