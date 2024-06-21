import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Counter } from 'src/counter/entities/counter.entity';
import { CounterModule } from 'src/counter/counter.module';

@Module({
    imports: [TypeOrmModule.forFeature([Reading, Counter]), CounterModule],
    controllers: [ReadingController],
    providers: [ReadingService],
    exports: [ReadingService],
})
export class ReadingModule {}
