// src/modules/rate/rate.dto.ts
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class RateDto {
    @IsString()
    @IsNotEmpty()
    from: string;

    @IsString()
    @IsNotEmpty()
    to: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date: string;
}
