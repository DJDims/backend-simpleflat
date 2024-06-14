import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingDto {
    @IsNumber({ maxDecimalPlaces: 3 })
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({
        description: 'Value on the counter',
        type: Number,
        required: true,
        default: 1,
    })
    value: number;

    @IsNumber()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the meter from which the readings are taken',
        type: Number,
        required: true,
        default: 1,
    })
    counterId: number;
}
