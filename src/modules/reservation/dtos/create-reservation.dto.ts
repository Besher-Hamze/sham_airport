// src/modules/reservation/dto/create-reservation.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  passengerName: string;

  @IsNotEmpty()
  @IsString()
  seatNumber: string;

  @IsNotEmpty()
  @IsString()
  docs: string;

  @IsNotEmpty()
  @IsString()
  tripType: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  trip: string; // will store the Trip's ID
}
