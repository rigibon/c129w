import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brands.controller';
import { BrandsService } from './brands.service';
import { Brand, BrandSchema } from '../schemas/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
