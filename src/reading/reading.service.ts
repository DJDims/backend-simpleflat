import { Injectable } from '@nestjs/common';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reading } from './entities/reading.entity';

@Injectable()
export class ReadingService {
    constructor(
        @InjectRepository(Reading)
        private readingRepository: Repository<Reading>,
    ) {}

    create(createReadingDto: CreateReadingDto) {
        return 'This action adds a new reading';
    }

    findAll() {
        return `This action returns all reading`;
    }

    findOne(id: number) {
        return `This action returns a #${id} reading`;
    }

    update(id: number, updateReadingDto: UpdateReadingDto) {
        return `This action updates a #${id} reading`;
    }

    remove(id: number) {
        return `This action removes a #${id} reading`;
    }
}
