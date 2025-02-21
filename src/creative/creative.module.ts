import { Module } from '@nestjs/common';
import { CreativeService } from './creative.service';
import { CreativeController } from './creative.controller';

@Module({
  providers: [CreativeService],
  controllers: [CreativeController]
})
export class CreativeModule {}
