import { Module } from '@nestjs/common';
import { FlatService } from './flat.service';
import { FlatController } from './flat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from './entities/flat.entity';
import { Counter } from 'src/counter/entities/counter.entity';
import { User } from 'src/user/entities/user.entity';
import { House } from 'src/house/entities/house.entity';
import { HouseModule } from 'src/house/house.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Flat, Counter, User, House]),
        HouseModule,
    ],
    controllers: [FlatController],
    providers: [FlatService],
    exports: [FlatService],
})
export class FlatModule {}
