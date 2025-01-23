// src/modules/trip/trip.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from './schema/trip.schema';
import { CreateTripDto } from './dto/create';
import { UpdateTripDto } from './dto/update';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
  ) { }

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const createdTrip = new this.tripModel(createTripDto);
    return createdTrip.save();
  }

  async findAll(): Promise<Trip[]> {
    return this.tripModel.find().populate('flight reservations').exec();
  }

  async findOne(id: string): Promise<Trip> {
    const trip = await this.tripModel
      .findById(id)
      .populate('flight reservations')
      .exec();
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto): Promise<Trip> {
    const updatedTrip = await this.tripModel
      .findByIdAndUpdate(id, updateTripDto, { new: true })
      .exec();
    if (!updatedTrip) {
      throw new NotFoundException('Trip not found');
    }
    return updatedTrip;
  }

  async remove(id: string): Promise<Trip> {
    const deletedTrip = await this.tripModel.findByIdAndDelete(id).exec();
    if (!deletedTrip) {
      throw new NotFoundException('Trip not found');
    }
    return deletedTrip;
  }
}
