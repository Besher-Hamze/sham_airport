// src/modules/reservation/reservation.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update';
import { ReservationService } from './reservation..service';
import { Reservation } from './schema/reservation.schema';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Reservation> {
    return this.reservationService.remove(id);
  }
}
