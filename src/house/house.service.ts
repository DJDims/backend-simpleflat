import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from './entities/house.entity';
import { City } from 'src/city/entities/city.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class HouseService {
    constructor(
        @InjectRepository(House)
        private houseRepository: Repository<House>,
        @InjectRepository(City)
        private cityRepository: Repository<City>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createHouseDto: CreateHouseDto) {
        const { cityId, ownerId, street, houseNumber } = createHouseDto;
        const city = await this.cityRepository.findOneBy({
            id: cityId,
        });
        if (!city)
            throw new NotFoundException(`City with id ${cityId} not found`);
        const owner = await this.userRepository.findOneBy({ id: ownerId });
        if (!owner)
            throw new NotFoundException(`User with id ${ownerId} not found`);
        const houseExist = await this.houseRepository.findOneBy({
            street: street,
            houseNumber: houseNumber,
            city: city,
        });
        if (houseExist)
            throw new ConflictException(
                `House with number ${houseNumber} on street ${street} in city ${city.name} alredy exist`,
            );
        const house = this.houseRepository.create(createHouseDto);
        house.city = city;
        house.owner = owner;
        return await this.houseRepository.save(house);
    }

    async findAll() {
        return await this.houseRepository.find();
    }

    async findOne(id: number) {
        const house = await this.houseRepository.findOneBy({ id });
        if (!house)
            throw new NotFoundException(`House with id ${id} not found`);
        return house;
    }

    async update(id: number, updateHouseDto: UpdateHouseDto) {
        const { cityId, ownerId, street, houseNumber } = updateHouseDto;
        const existHouse = await this.houseRepository.findOne({
            where: { id },
            relations: ['owner', 'city'],
        });
        if (!existHouse)
            throw new NotFoundException(`House with id ${id} not found`);
        const city = await this.cityRepository.findOneBy({
            id: cityId || existHouse.city.id,
        });
        if (!city)
            throw new NotFoundException(`City with id ${cityId} not found`);
        const owner = await this.userRepository.findOneBy({
            id: ownerId || existHouse.owner.id,
        });
        if (!owner)
            throw new NotFoundException(`User with id ${ownerId} not found`);
        const houseExist = await this.houseRepository.findOneBy({
            street: street,
            houseNumber: houseNumber,
            city: { id: cityId },
        });
        if (houseExist)
            throw new ConflictException(
                `House number ${houseNumber} on street ${street} in city ${city.name} alredy exist`,
            );
        const house = this.houseRepository.create(updateHouseDto);
        house.city = city;
        house.owner = owner;
        await this.houseRepository.update(id, house);
        return await this.houseRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const house = await this.houseRepository.findOneBy({ id });
        if (!house)
            throw new NotFoundException(`House with id ${id} not found`);
        await this.houseRepository.delete(id);
        return house;
    }
}
