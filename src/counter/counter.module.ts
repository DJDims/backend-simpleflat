import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from 'src/flat/entities/flat.entity';
import { Counter } from './entities/counter.entity';
import { Reading } from 'src/reading/entities/reading.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Counter, Flat, Reading])],
    controllers: [CounterController],
    providers: [CounterService],
})
export class CounterModule {}
