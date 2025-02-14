import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../schemas/brand.schema';
import { Model } from 'mongoose';
import { CreateBrandDto } from './createbrand';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private BrandModel: Model<Brand>) { }

  async findAll(): Promise<Brand[]> {
    return await this.BrandModel.find().exec();
  }

  async findById(id: number): Promise<Brand> {
    return await this.BrandModel.findById(id).exec();
  }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const { _id, ...brandData } = createBrandDto;

    const newBrand = new this.BrandModel(brandData);
    return await newBrand.save();
  }

  async update(id: string, updateBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = await this.BrandModel.findById(id);

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    Object.assign(brand, updateBrandDto);

    return brand.save();
  }

  async remove(id: string): Promise<void> {
    const brand = await this.BrandModel.findByIdAndDelete(id);

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
  }
}
