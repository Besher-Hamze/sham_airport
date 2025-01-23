import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Trip } from 'src/modules/trip/schema/trip.schema';

@Schema()
export class Reservation extends Document {
  @Prop({ required: true })
  passengerName: string;

  @Prop({ required: true })
  seatNumber: string;

  @Prop({ required: true })
  docs: string;

  @Prop({ required: true })
  tripType: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ type: String, ref: 'Trip' })
  trip: Trip;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
