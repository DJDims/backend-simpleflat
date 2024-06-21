import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './entities/house.entity';
import { Flat } from 'src/flat/entities/flat.entity';
import { User } from 'src/user/entities/user.entity';
import { City } from 'src/city/entities/city.entity';
import { CityModule } from 'src/city/city.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([House, Flat, User, City]),
        CityModule,
        UserModule,
    ],
    controllers: [HouseController],
    providers: [HouseService],
    exports: [HouseService],
})
export class HouseModule {}
