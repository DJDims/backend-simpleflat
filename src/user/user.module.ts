import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { House } from 'src/house/entities/house.entity';
import { Flat } from 'src/flat/entities/flat.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, House, Flat])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
