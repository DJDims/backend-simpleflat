import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Reading } from './entities/reading.entity';
import { Counter } from 'src/counter/entities/counter.entity';

@Injectable()
export class ReadingService {
    constructor(
        @InjectRepository(Reading)
        private readingRepository: Repository<Reading>,
        @InjectRepository(Counter)
        private counterRepository: Repository<Counter>,
    ) {}

    async create(createReadingDto: CreateReadingDto) {
        const counter = await this.counterRepository.findOneBy({
            id: createReadingDto.counterId,
        });
        if (!counter)
            throw new NotFoundException(
                `Counter with id ${createReadingDto.counterId} not found`,
            );
        const startOfMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
        );
        const endOfMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0,
        );
        const month = this.getCurrentMonthName();
        const readingExist = await this.readingRepository.findOne({
            where: {
                counter: { id: createReadingDto.counterId },
                createdAt: Between(startOfMonth, endOfMonth),
            },
        });
        if (readingExist)
            throw new ConflictException(
                `Reading in month ${month} alredy exist`,
            );
        const reading = this.readingRepository.create(createReadingDto);
        reading.counter = counter;
        return this.readingRepository.save(reading);
    }

    async findAll() {
        return await this.readingRepository.find();
    }

    async findOne(id: number) {
        const reading = await this.readingRepository.findOneBy({ id });
        if (!reading)
            throw new NotFoundException(`Reading with id ${id} not found`);
        return reading;
    }

    async update(id: number, updateReadingDto: UpdateReadingDto) {
        const reading = await this.readingRepository.findOneBy({ id });
        if (!reading)
            throw new NotFoundException(`Reading with id ${id} not found`);
        reading.value = updateReadingDto.value;
        await this.readingRepository.update(id, reading);
        return await this.readingRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const reading = await this.readingRepository.findOneBy({ id });
        if (!reading) throw new NotFoundException();
        await this.readingRepository.delete(id);
        return reading;
    }

    private getCurrentMonthName(): string {
        return new Date().toLocaleString('ru-RU', { month: 'long' });
    }
}
