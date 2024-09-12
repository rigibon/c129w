import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Param,
  Controller,
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
}
