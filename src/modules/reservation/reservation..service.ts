
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update';
import { Reservation } from './schema/reservation.schema';
import { Trip } from 'src/modules/trip/schema/trip.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
  ) { }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const tripDoc = await this.tripModel.findById(createReservationDto.trip);
    if (!tripDoc) {
      throw new NotFoundException('Trip not found');
    }

    if (tripDoc.endDate.getTime() < new Date().getTime()) {
      throw new ConflictException(
        'Cannot reserve a seat for a trip that has already ended',
      );
    }

    const existingReservation = await this.reservationModel.findOne({
      trip: createReservationDto.trip,
      seatNumber: createReservationDto.seatNumber,
    });

    if (existingReservation) {
      throw new ConflictException(
        'Seat is already booked for this flight/trip',
      );
    }

    const createdReservation = new this.reservationModel(createReservationDto);
    return createdReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().populate('trip').exec();
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationModel
      .findById(id)
      .populate('trip')
      .exec();
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return reservation;
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const existing = await this.reservationModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Reservation not found');
    }

    const newTripId = updateReservationDto.trip ?? existing.trip;
    const newSeatNumber =
      updateReservationDto.seatNumber ?? existing.seatNumber;

    if (updateReservationDto.trip && updateReservationDto.trip !== (existing.trip._id.toString())) {
      const tripDoc = await this.tripModel.findById(newTripId);
      if (!tripDoc) {
        throw new NotFoundException('Trip not found');
      }
      if (tripDoc.endDate.getTime() < new Date().getTime()) {
        throw new ConflictException(
          'Cannot move reservation to a trip that has already ended',
        );
      }
    }

    if (
      (updateReservationDto.trip && updateReservationDto.trip !== (existing.trip._id.toString())) ||
      (updateReservationDto.seatNumber &&
        updateReservationDto.seatNumber !== existing.seatNumber)
    ) {
      const conflict = await this.reservationModel.findOne({
        _id: { $ne: id },
        trip: newTripId,
        seatNumber: newSeatNumber,
      });
      if (conflict) {
        throw new ConflictException(
          'Seat is already booked for this flight/trip',
        );
      }
    }

    const updatedReservation = await this.reservationModel
      .findByIdAndUpdate(id, updateReservationDto, { new: true })
      .exec();

    return updatedReservation;
  }

  async remove(id: string): Promise<Reservation> {
    const deletedReservation = await this.reservationModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedReservation) {
      throw new NotFoundException('Reservation not found');
    }
    return deletedReservation;
  }
}
