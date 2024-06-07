import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the city',
        type: String,
        required: true,
        default: 'Narva',
    })
    name: string;
}
