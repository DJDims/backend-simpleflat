import { Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from './entities/house.entity';

@Injectable()
export class HouseService {
    constructor(
        @InjectRepository(House)
        private houseRepository: Repository<House>,
    ) {}

    create(createHouseDto: CreateHouseDto) {
        return 'This action adds a new house';
    }

    findAll() {
        return `This action returns all house`;
    }

    findOne(id: number) {
        return `This action returns a #${id} house`;
    }

    update(id: number, updateHouseDto: UpdateHouseDto) {
        return `This action updates a #${id} house`;
    }

    remove(id: number) {
        return `This action removes a #${id} house`;
    }
}
