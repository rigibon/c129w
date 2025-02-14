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
import { CreateBrandDto } from './createbrand';

@Controller('brands')
export class BrandController {
  constructor(private readonly BrandsService: BrandsService) { }

  @Get()
  async findAll(): Promise<Brand[]> {
    return this.BrandsService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: any): Promise<Brand> {
    return this.BrandsService.findById(params.id);
  }

  @Post("")
  async create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    console.log(createBrandDto);
    return this.BrandsService.create(createBrandDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBrandDto: CreateBrandDto): Promise<Brand> {
    console.log('Updating brand with ID:', id);
    return this.BrandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.BrandsService.remove(id);
  }
}
