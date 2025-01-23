import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFlightDto {
  @IsNotEmpty()
  @IsString()
  flightNumber: string;

  @IsNotEmpty()
  @IsNumber()
  seats: number;
}
