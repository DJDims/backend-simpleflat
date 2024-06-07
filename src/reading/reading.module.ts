import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Counter } from 'src/counter/entities/counter.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reading, Counter])],
    controllers: [ReadingController],
    providers: [ReadingService],
})
export class ReadingModule {}
