import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counter } from './entities/counter.entity';
import { Flat } from 'src/flat/entities/flat.entity';

@Injectable()
export class CounterService {
    constructor(
        @InjectRepository(Counter)
        private counterRepository: Repository<Counter>,
        @InjectRepository(Flat)
        private flatRepository: Repository<Flat>,
    ) {}

    async create(createCounterDto: CreateCounterDto) {
        const { name, flatId } = createCounterDto;
        const flat = await this.flatRepository.findOneBy({
            id: flatId,
        });
        if (!flat)
            throw new NotFoundException(`Flat with id ${flatId} not exist`);
        const existCounter = await this.counterRepository.findOneBy({
            name,
            flat: { id: flatId },
        });
        if (existCounter)
            throw new ConflictException(
                `Counter ${name} already exist in flat ${flatId}`,
            );
        const counter = this.counterRepository.create(createCounterDto);
        counter.flat = flat;
        return this.counterRepository.save(counter);
    }

    async findAll() {
        return await this.counterRepository.find();
    }

    async findOne(id: number) {
        const counter = await this.counterRepository.findOneBy({ id });
        if (!counter) throw new NotFoundException();
        return counter;
    }

    async update(id: number, updateCounterDto: UpdateCounterDto) {
        const { name, flatId } = updateCounterDto;
        const existCounter = await this.counterRepository.findOne({
            where: { id },
            relations: ['flat'],
        });
        if (!existCounter)
            throw new NotFoundException(`Counter with id ${id} not exist`);
        const flat = await this.flatRepository.findOneBy({
            id: flatId || existCounter.flat.id,
        });
        if (!flat)
            throw new NotFoundException(`Flat with id ${flatId} not exist`);
        const existCounterInFlat = await this.counterRepository.findOneBy({
            name: name || existCounter.name,
            flat: { id: flatId || existCounter.flat.id },
        });
        if (existCounterInFlat)
            throw new ConflictException(
                `Counter ${name} already exist in flat ${flatId || existCounter.flat.id}`,
            );
        const counter = this.counterRepository.create(updateCounterDto);
        counter.flat = flat;
        await this.counterRepository.update(id, counter);
        return await this.counterRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const counter = await this.counterRepository.findOneBy({ id });
        if (!counter) throw new NotFoundException();
        await this.counterRepository.delete(id);
        return counter;
    }
}
