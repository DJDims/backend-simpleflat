import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from 'src/flat/entities/flat.entity';
import { Counter } from './entities/counter.entity';
import { Reading } from 'src/reading/entities/reading.entity';
import { FlatModule } from 'src/flat/flat.module';

@Module({
    imports: [TypeOrmModule.forFeature([Counter, Flat, Reading]), FlatModule],
    controllers: [CounterController],
    providers: [CounterService],
    exports: [CounterService],
})
export class CounterModule {}
