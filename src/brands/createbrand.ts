import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsOptional()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  mainColor: string;

  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  headerColor?: string;

  @IsString()
  @IsOptional()
  logoBgColor?: string;

  @IsString()
  @IsOptional()
  brandLogo?: string;

  @IsString()
  @IsOptional()
  favicon?: string;

  @IsString()
  @IsOptional()
  backgroundImage?: string;
}
