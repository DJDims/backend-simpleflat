import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDto {
    @IsString()
    @ApiProperty({
        description: 'The street on which the house is located',
        type: String,
        required: true,
        default: 'Kreenholmi',
    })
    street: string;

    @IsNumber()
    @ApiProperty({
        description: 'House number',
        type: Number,
        required: true,
        default: 28,
    })
    house: number;

    @IsNumber()
    @ApiProperty({
        description: 'Postcode',
        type: Number,
        required: true,
        default: 20206,
    })
    zip: number;

    @IsNumber()
    @ApiProperty({
        description: 'The ID of the user who will manage the house',
        type: Number,
        required: true,
        default: 1,
    })
    owner: number;

    @IsNumber()
    @ApiProperty({
        description: 'Id of the city where the house is located',
        type: Number,
        required: true,
        default: 1,
    })
    cityId: number;
}
