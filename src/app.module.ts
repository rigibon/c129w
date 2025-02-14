import { Module } from '@nestjs/common';
import { TranslationService } from './translation/translation.service';
import { TranslationController } from './translation/translation.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brands/brands.controller';
import { BrandsModule } from './brands/brands.module';
import { CreatorService } from './creator/creator.service';
import { CreatorController } from './creator/creator.controller';

const storage = diskStorage({
  destination: path.join(__dirname, '..', 'client'),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://new_user_01:qWASO8ex9CbKZtCI@cluster0.n3ac2vj.mongodb.net/creatives-db',
    ),
    BrandsModule,
    MulterModule.register({ storage: storage }),
  ],
  controllers: [TranslationController, CreatorController],
  providers: [TranslationService, CreatorService],
})
export class AppModule { }
