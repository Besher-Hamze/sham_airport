import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create';

export class UpdateTripDto extends PartialType(CreateTripDto) {}
