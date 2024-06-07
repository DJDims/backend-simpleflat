import { IsString, IsEmail, MinLength } from '@nestjs/class-validator';

export class CreateUserDto {
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be 8 or more characters long' })
    password: string;
}
