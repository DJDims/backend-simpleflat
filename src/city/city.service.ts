import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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

    async create(createCityDto: CreateCityDto) {
        const existCity = await this.cityRepository.findOneBy({
            name: createCityDto.name,
        });

        if (existCity)
            throw new ConflictException(
                `City ${createCityDto.name} alredy exists`,
            );
        return await this.cityRepository.save(createCityDto);
    }

    async findAll() {
        return await this.cityRepository.find();
    }

    async findOne(id: number) {
        const city = await this.cityRepository.findOneBy({ id });
        if (!city) throw new NotFoundException();
        return city;
    }

    async update(id: number, updateCityDto: UpdateCityDto) {
        const existCity = await this.cityRepository.findOneBy({
            name: updateCityDto.name,
        });
        if (existCity)
            throw new ConflictException(
                `City ${updateCityDto.name} alredy exists`,
            );
        const city = await this.cityRepository.findOneBy({ id });
        if (!city) throw new NotFoundException();
        await this.cityRepository.update(id, updateCityDto);
        return await this.cityRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const city = await this.cityRepository.findOneBy({ id });
        if (!city) throw new NotFoundException();
        await this.cityRepository.delete(id);
        return city;
    }
}
