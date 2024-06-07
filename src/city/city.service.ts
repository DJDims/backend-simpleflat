import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    create(createCityDto: CreateCityDto) {
        return 'This action adds a new city';
    }

    findAll() {
        return `This action returns all city`;
    }

    findOne(id: number) {
        return `This action returns a #${id} city`;
    }

    update(id: number, updateCityDto: UpdateCityDto) {
        return `This action updates a #${id} city`;
    }

    remove(id: number) {
        return `This action removes a #${id} city`;
    }
}
