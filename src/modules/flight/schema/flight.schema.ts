import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Flight extends Document {
  @Prop({ required: true, unique: true })
  flightNumber: string;

  @Prop({ required: true })
  seats: number;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
