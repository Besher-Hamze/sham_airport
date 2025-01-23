// src/modules/flight/flight.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateFlightDto } from './dto/create';
import { UpdateFlightDto } from './dto/update';
import { FlightService } from './flight.service';
import { Flight } from './schema/flight.schema';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) { }

  @Post()
  create(@Body() createFlightDto: CreateFlightDto): Promise<Flight> {
    return this.flightService.create(createFlightDto);
  }

  @Get()
  findAll(): Promise<Flight[]> {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Flight> {
    return this.flightService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    return this.flightService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Flight> {
    return this.flightService.remove(id);
  }
}
