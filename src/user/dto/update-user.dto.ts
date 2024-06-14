import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
}
