import { Module } from "@nestjs/common";
import { RateController } from "./rate.controller";
import { RateService } from "./rate.service";
import { MongooseModule } from "@nestjs/mongoose";
import { RatePrice, RatePriceSchema } from "./schema/rate_price.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: RatePrice.name,
            schema: RatePriceSchema,
        }]),
    ],
    controllers: [RateController],
    providers: [RateService],
    exports: [RateService]
})
export class RateModule { }