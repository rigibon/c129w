import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  mainColor: string;

  @Prop()
  secondaryColor: string;

  @Prop()
  headerColor: string;

  @Prop()
  brandLogo: string;

  @Prop()
  favicon: string;

  @Prop()
  backgroundImage: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
