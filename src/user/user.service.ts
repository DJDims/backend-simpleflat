import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as ag2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly emailService: EmailService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOneBy({
            email: createUserDto.email,
        });
        if (existUser)
            throw new ConflictException(
                `Email ${createUserDto.email} already taken`,
            );
        const user = this.userRepository.create(createUserDto);
        user.password = await ag2.hash(createUserDto.password);
        user.token = await uuidv4();
        await this.emailService.sendUserConfirmation(user);
        return this.userRepository.save(user);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const userExist = await this.userRepository.findOneBy({ id });
        if (!userExist)
            throw new NotFoundException(`User with id ${id} not found`);
        await this.userRepository.update(id, {
            firstname: updateUserDto.firstname,
            lastname: updateUserDto.lastname,
        });
        return await this.userRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        await this.userRepository.delete(id);
        return await this.userRepository.findOneBy({ id });
    }
}
