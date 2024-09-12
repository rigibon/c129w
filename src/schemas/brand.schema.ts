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
  primaryColor: string;

  @Prop()
  hoverPrimaryColor: string;

  @Prop()
  secondaryColor: string;

  @Prop()
  brandLogo: string;

  @Prop()
  favicon: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
