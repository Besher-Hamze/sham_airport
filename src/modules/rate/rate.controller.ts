import { Body, Controller, Post } from "@nestjs/common";
import { RateDto } from "./dto/rate-request.dto";
import { RateService } from "./rate.service";

@Controller("rate")
export class RateController {
    constructor(private readonly rateService: RateService) { }
    
    @Post()
    async calculateRate(@Body() payload: RateDto) {
        return  this.rateService.calculatePrice(payload.from, payload.to, payload.date);
    }
}