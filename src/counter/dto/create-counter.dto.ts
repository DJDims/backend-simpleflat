import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCounterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Counter name',
        type: String,
        required: true,
        default: 'Bathroom',
    })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    @ApiProperty({
        description: 'ID of the apartment where this counter is located',
        type: Number,
        required: true,
        default: 1,
    })
    flatId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Counter type: hot_water | cold_water | gas',
        type: String,
        required: true,
    })
    counterType: string;
}
