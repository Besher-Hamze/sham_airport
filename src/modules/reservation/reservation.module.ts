import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from '../trip/schema/trip.schema';
import { ReservationService } from './reservation..service';
import { ReservationController } from './reservation.controller';
import { Reservation, ReservationSchema } from './schema/reservation.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Reservation.name, schema: ReservationSchema },
            { name: Trip.name, schema: TripSchema },
        ]),
    ],
    controllers: [ReservationController],
    providers: [ReservationService],
    exports: [ReservationService],
})
export class ReservationModule { }
