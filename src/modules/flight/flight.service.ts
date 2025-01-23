// src/modules/flight/flight.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFlightDto } from './dto/create';
import { UpdateFlightDto } from './dto/update';
import { Flight } from './schema/flight.schema';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private readonly flightModel: Model<Flight>,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const createdFlight = new this.flightModel(createFlightDto);
    return createdFlight.save();
  }

  async findAll(): Promise<Flight[]> {
    return this.flightModel.find().exec();
  }

  async findOne(id: string): Promise<Flight> {
    const flight = await this.flightModel.findById(id).exec();
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    return flight;
  }

  async update(id: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const updatedFlight = await this.flightModel
      .findByIdAndUpdate(id, updateFlightDto, { new: true })
      .exec();
    if (!updatedFlight) {
      throw new NotFoundException('Flight not found');
    }
    return updatedFlight;
  }

  async remove(id: string): Promise<Flight> {
    const deletedFlight = await this.flightModel.findByIdAndDelete(id).exec();
    if (!deletedFlight) {
      throw new NotFoundException('Flight not found');
    }
    return deletedFlight;
  }
}
