// src/modules/flight/flight.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { Flight, FlightSchema } from './schema/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
  ],
  controllers: [FlightController],
  providers: [FlightService],
  exports: [FlightService], // export if used by other modules
})
export class FlightModule {}
