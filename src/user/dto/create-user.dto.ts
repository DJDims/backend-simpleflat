import {
    IsString,
    IsEmail,
    MinLength,
    IsNotEmpty,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User firstname',
        type: String,
        required: true,
        default: 'John',
    })
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User lastname',
        type: String,
        required: true,
        default: 'Smith',
    })
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User email',
        type: String,
        required: true,
        default: 'john.smith@gmail.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be 8 or more characters long' })
    @ApiProperty({
        description: 'User hashed password',
        type: String,
        required: true,
        default: '12345678',
    })
    password: string;
}
