import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../schemas/brand.schema';
import { Model } from 'mongoose';
import { CreateBrandDto } from './createbrand';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private BrandModel: Model<Brand>) {}

  async findAll(): Promise<Brand[]> {
    return await this.BrandModel.find().exec();
  }

  async findById(id: number): Promise<Brand> {
    return await this.BrandModel.findById(id).exec();
  }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const newBrand = new this.BrandModel(createBrandDto);
    return await newBrand.save();
  }
}
