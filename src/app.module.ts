import { Module } from "@nestjs/common";
import { RateModule } from "./modules/rate/rate.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ReservationModule } from "./modules/reservation/reservation.module";
import { FlightModule } from "./modules/flight/flight.module";
import { TripModule } from "./modules/trip/trip.module";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/sham'),
        RateModule,
        ReservationModule,
        FlightModule,
        TripModule,
    ],
})
export class AppModule { }