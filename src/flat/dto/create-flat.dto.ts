import { IsNumber, IsPositive } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlatDto {
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'Flat number',
        type: Number,
        required: true,
        default: 32,
    })
    flat: number;

    @IsNumber()
    @ApiProperty({
        description: 'The user ID of the person who lives in this flat',
        type: Number,
        required: true,
        default: 1,
    })
    userId: number;

    @IsNumber()
    @ApiProperty({
        description: 'The ID of the house in which this flat is located',
        type: Number,
        required: true,
        default: 1,
    })
    houseId: number;
}
