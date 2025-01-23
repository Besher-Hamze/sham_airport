// src/modules/trip/trip.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create';
import { UpdateTripDto } from './dto/update';
import { Trip } from './schema/trip.schema';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) { }

  @Post()
  create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripService.create(createTripDto);
  }

  @Get()
  findAll(): Promise<Trip[]> {
    return this.tripService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trip> {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Trip> {
    return this.tripService.remove(id);
  }
}
