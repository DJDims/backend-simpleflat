import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
    @IsString()
    @ApiProperty({
        description: 'Name of the city',
        type: String,
        required: true,
        default: 'Narva',
    })
    name: string;
}
