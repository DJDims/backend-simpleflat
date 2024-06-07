import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { House } from 'src/house/entities/house.entity';

@Module({
    imports: [TypeOrmModule.forFeature([City, House])],
    controllers: [CityController],
    providers: [CityService],
})
export class CityModule {}
