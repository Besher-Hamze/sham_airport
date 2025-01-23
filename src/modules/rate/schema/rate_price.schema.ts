
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RatePrice extends Document {
    @Prop({ required: true, unique: true })
    from: string;
    @Prop({ type: Object, default: {} })
    to: Record<string, number>;
}

export const RatePriceSchema = SchemaFactory.createForClass(RatePrice);
