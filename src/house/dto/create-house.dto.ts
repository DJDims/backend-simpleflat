import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The street on which the house is located',
        type: String,
        required: true,
        default: 'Kreenholmi',
    })
    street: string;

    @IsNumber()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({
        description: 'House number',
        type: Number,
        required: true,
        default: 28,
    })
    houseNumber: number;

    @IsNumber()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Postcode',
        type: Number,
        required: true,
        default: 20206,
    })
    zip: number;

    @IsNumber()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The ID of the user who will manage the house',
        type: Number,
        required: true,
        default: 1,
    })
    ownerId: number;

    @IsNumber()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Id of the city where the house is located',
        type: Number,
        required: true,
        default: 1,
    })
    cityId: number;
}
