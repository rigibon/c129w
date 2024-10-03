import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Param,
  Controller,
  Req,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brand } from 'src/schemas/brand.schema';

@Controller('brands')
export class BrandController {
  constructor(private readonly BrandsService: BrandsService) {}

  @Get()
  async findAll(): Promise<Brand[]> {
    return this.BrandsService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: any): Promise<Brand> {
    return this.BrandsService.findById(params.id);
  }
}
