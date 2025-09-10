import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../schemas/brand.schema';
import { Model } from 'mongoose';
import { CreateBrandDto } from './createbrand';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

    async translateKeywords(keywords: any, language: string) {
        const API_KEY = 'AIzaSyD_YOrEpX3fm8WR6lru0IK7_-MOkfkk_g4';

        const configuration = new GoogleGenerativeAI(API_KEY);

        const modelId = 'gemini-2.5-flash';
        const model = configuration.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const result = await chat.sendMessage(`translate these keywords to ${language}, output must be the same as the input but with the keywords translated, as JSON format: ${keywords}`);

        const response = await result.response;

        return response.text();
    }

    async remove(id: string): Promise<void> {
        const brand = await this.BrandModel.findByIdAndDelete(id);

        if (!brand) {
            throw new NotFoundException(`Brand with ID ${id} not found`);
        }
    }

    async getBrandSuggestions(product: string, geo: string): Promise<string> {
        const API_KEY = 'AIzaSyD_YOrEpX3fm8WR6lru0IK7_-MOkfkk_g4';

        const configuration = new GoogleGenerativeAI(API_KEY);

        const modelId = 'gemini-2.5-flash';
        const model = configuration.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const result = await chat.sendMessage(`Which retailers in ${geo} are more likely to sell this product "${product}"? Please THE OUTPUT MUST HAVE THIS SHAPE, MAX 5 brands, note the matching percentage must not have the percentage symbol: { suggested_brands: [ { brand: Brand 1, matching_percentage: 100 }, { brand: Brand 2, matching_percentage: 85 }, { brand: Brand 3, matching_percentage: 70 }, { brand: Brand 4, matching_percentage: 58 }, { brand: Brand 5, matching_percentage: 21 } ]; }`);

        const response = await result.response;

        const parsedResponse = JSON.parse(response.text().replace(/```/g, '').replace(/JSON/g, '').replace(/json/g, ''));

        const brandPromises = parsedResponse.suggested_brands.map(async (suggestedBrand: { brand: string, matching_percentage: number }) => {
            const brand = await this.BrandModel.findOne({ name: suggestedBrand.brand }).exec();

            return {
                ...suggestedBrand,
                exists_in_database: brand ? true : false,
                brand_id: brand ? brand._id : null,
                brandLogo: brand ? brand.brandLogo : null
            };
        });

        const updatedBrands = await Promise.all(brandPromises);

        return JSON.stringify({
            suggested_brands: updatedBrands
        });
    }
}