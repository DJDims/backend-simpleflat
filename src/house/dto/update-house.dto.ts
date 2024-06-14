import {
    IsString,
    IsNumber,
    IsInt,
    IsPositive,
    IsNotEmpty,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHouseDto } from './create-house.dto';

export class UpdateHouseDto extends PartialType(CreateHouseDto) {
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
