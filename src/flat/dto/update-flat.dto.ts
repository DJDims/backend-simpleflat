import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFlatDto } from './create-flat.dto';
import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
} from '@nestjs/class-validator';

export class UpdateFlatDto extends PartialType(CreateFlatDto) {
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
        description: 'The user ID of the person who lives in this flat',
        type: Number,
        required: true,
        default: 1,
    })
    userId: number;

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
