// src/modules/trip/dto/create-trip.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  flightNumber: string;

  @IsNotEmpty()
  @IsNumber()
  passengerNumber: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  flight: string;

}
