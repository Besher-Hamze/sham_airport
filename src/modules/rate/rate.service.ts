import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypeEnum } from 'src/common/enums/type.enum';
import { RatePrice } from './schema/rate_price.schema';

@Injectable()
export class RateService {
    constructor(
        @InjectModel(RatePrice.name)
        private readonly routePricesModel: Model<RatePrice>,
    ) {
    }
    private basePrices: Record<string, Record<string, number>> = {
        France: {
            Germany: 200,
            Belgium: 150,
            US: 800,
            Switzerland: 180,
            Turkey: 250,
            Armenia: 300,
            Russia: 400,
            China: 600,
        },
        Germany: {
            France: 200,
            Belgium: 120,
            US: 750,
            Switzerland: 170,
            Turkey: 230,
            Armenia: 280,
            Russia: 390,
            China: 580,
        },
        Belgium: {
            France: 150,
            Germany: 120,
            US: 770,
            Switzerland: 190,
            Turkey: 220,
            Armenia: 310,
            Russia: 410,
            China: 590,
        },
        US: {
            France: 800,
            Germany: 750,
            Belgium: 770,
            Switzerland: 850,
            Turkey: 600,
            Armenia: 700,
            Russia: 1000,
            China: 1200,
        },
        Switzerland: {
            France: 180,
            Germany: 170,
            Belgium: 190,
            US: 850,
            Turkey: 400,
            Armenia: 450,
            Russia: 500,
            China: 700,
        },
        Turkey: {
            France: 250,
            Germany: 230,
            Belgium: 220,
            US: 600,
            Switzerland: 400,
            Armenia: 200,
            Russia: 450,
            China: 550,
        },
        Armenia: {
            France: 300,
            Germany: 280,
            Belgium: 310,
            US: 700,
            Switzerland: 450,
            Turkey: 200,
            Russia: 500,
            China: 650,
        },
        Russia: {
            France: 400,
            Germany: 390,
            Belgium: 410,
            US: 1000,
            Switzerland: 500,
            Turkey: 450,
            Armenia: 500,
            China: 800,
        },
        China: {
            France: 600,
            Germany: 580,
            Belgium: 590,
            US: 1200,
            Switzerland: 700,
            Turkey: 550,
            Armenia: 650,
            Russia: 800,
        },
    };

    public async seedPrices(): Promise<void> {
        await this.routePricesModel.deleteMany({});
        console.log('Cleared existing route data.');

        for (const [fromCountry, toObject] of Object.entries(this.basePrices)) {
            await this.routePricesModel.create({
                from: fromCountry,
                to: toObject,
            });
        }

        console.log('Default route prices seeded successfully!');
    }

    public async calculatePrice(from: string, to: string, date: string) {
        const routeDoc = await this.routePricesModel.findOne({
            from,
        }).exec();

        if (!routeDoc || !routeDoc.to) {
            throw new BadRequestException(`No valid route found for ${from} → ${to}`);
        }

        const basePrice = routeDoc.to[to];

        const flightDate = new Date(date);
        if (isNaN(flightDate.getTime())) {
            throw new BadRequestException(`Invalid date format: ${date}`);
        }

        const now = new Date();
        const diffInMs = flightDate.getTime() - now.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        let factor = 1;
        if (diffInDays <= 7) {
            factor = 1.5;
        } else if (diffInDays <= 30) {
            factor = 1.2;
        } else if (diffInDays <= 60) {
            factor = 1.1;
        }

        const finalPrice = Math.round(basePrice * factor);

        return [
            {
                from,
                to,
                date,
                basePrice,
                type: TypeEnum.VIP,
                price: Math.round(finalPrice * 1.5),
            },
            {
                from,
                to,
                date,
                basePrice,
                type: TypeEnum.CONFORT,
                price: Math.round(finalPrice * 1.2),
            },
            {
                from,
                to,
                date,
                basePrice,
                type: TypeEnum.TRANSITE,
                price: finalPrice,
            },
        ];
    }
}
