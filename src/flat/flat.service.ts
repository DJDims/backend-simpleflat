import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flat } from './entities/flat.entity';
import { House } from 'src/house/entities/house.entity';

@Injectable()
export class FlatService {
    constructor(
        @InjectRepository(Flat)
        private flatRepository: Repository<Flat>,
        @InjectRepository(House)
        private houseRepository: Repository<House>,
    ) {}

    async create(createFlatDto: CreateFlatDto) {
        const { flatNumber, houseId } = createFlatDto;
        const house = await this.houseRepository.findOneBy({ id: houseId });
        if (!house)
            throw new NotFoundException(`House with id ${houseId} not found`);
        const flatExist = await this.flatRepository.findOneBy({
            flatNumber: flatNumber,
            house: { id: houseId },
        });
        if (flatExist)
            throw new ConflictException(
                `Flat ${flatNumber} alredy exist in house with id ${houseId}`,
            );
        const flat = this.flatRepository.create(createFlatDto);
        flat.house = house;
        return this.flatRepository.save(flat);
    }

    async findAll() {
        return await this.flatRepository.find();
    }

    async findOne(id: number) {
        const flat = await this.flatRepository.findOneBy({ id });
        if (!flat) throw new NotFoundException(`Flat with id ${id} not exist`);
        return flat;
    }

    async update(id: number, updateFlatDto: UpdateFlatDto) {
        const { flatNumber, houseId } = updateFlatDto;
        const existFlat = await this.flatRepository.findOne({
            where: { id },
            relations: ['house'],
        });
        const house = await this.houseRepository.findOneBy({
            id: houseId || existFlat.house.id,
        });
        if (!house)
            throw new NotFoundException(`House with id ${houseId} not found`);
        const flatExist = await this.flatRepository.findOneBy({
            flatNumber: flatNumber,
            house: { id: houseId },
        });
        if (flatExist)
            throw new ConflictException(
                `Flat ${flatNumber} alredy exist in house with id ${houseId || existFlat.house.id}`,
            );
        const flat = this.flatRepository.create(updateFlatDto);
        flat.house = house;
        await this.flatRepository.update(id, flat);
        return this.flatRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const flat = await this.flatRepository.findOneBy({ id });
        if (!flat) throw new NotFoundException(`Flat with id ${id} not exist`);
        await this.flatRepository.delete(flat);
        return flat;
    }
}
