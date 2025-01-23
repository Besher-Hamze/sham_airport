import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Flight } from 'src/modules/flight/schema/flight.schema';
import { Reservation } from 'src/modules/reservation/schema/reservation.schema';

@Schema()
export class Trip extends Document {
  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  flightNumber: string;

  @Prop({ required: true })
  passengerNumber: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: String, ref: 'Flight' })
  flight: Flight;

  @Prop({ type: [{ type: String, ref: 'Reservation' }] })
  reservations: Reservation[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);

