import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlatDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @IsInt()
    @ApiProperty({
        description: 'Flat number',
        type: Number,
        required: true,
        default: 32,
    })
    flatNumber: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @IsInt()
    @ApiProperty({
        description: 'The ID of the house in which this flat is located',
        type: Number,
        required: true,
        default: 1,
    })
    houseId: number;
}
