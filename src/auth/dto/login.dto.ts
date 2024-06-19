import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Your email',
        type: String,
        required: true,
        default: 'john.smith@gmail.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be 8 or more characters long' })
    @ApiProperty({
        description: 'Your password',
        type: String,
        required: true,
        default: '12345678',
    })
    password: string;
}
