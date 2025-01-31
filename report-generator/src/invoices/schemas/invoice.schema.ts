import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvoiceDocument = HydratedDocument<Invoice>

@Schema()
export class Invoice {
  @Prop({ required: true })
  customer: string;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true })
  reference: string;

  @Prop({ required: true, default: Date.now })
  date: Date;

  @Prop({ type: [{ sku: String, qt: Number }], required: true })
  items: { sku: string; qt: number; }[];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);