import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCounterDto } from './create-counter.dto';
import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from '@nestjs/class-validator';

export class UpdateCounterDto extends PartialType(CreateCounterDto) {
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
