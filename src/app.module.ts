import { Module } from '@nestjs/common';
import { TranslationService } from './translation/translation.service';
import { TranslationController } from './translation/translation.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: path.join(__dirname, '..', 'client', 'tryetco', 'files'),
  filename: function (req, file, cb) {
    cb(null, 'bg' + path.extname(file.originalname));
  },
});

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client'),
    }),
    MulterModule.register({
      storage: storage,
    }),
  ],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class AppModule {}
