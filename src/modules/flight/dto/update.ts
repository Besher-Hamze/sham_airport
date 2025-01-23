import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {}
