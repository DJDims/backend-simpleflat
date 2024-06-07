import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingDto {
    @IsNumber()
    @ApiProperty({
        description: 'Value on the counter',
        type: Number,
        required: true,
        default: 1,
    })
    value: number;

    @IsNumber()
    @ApiProperty({
        description: 'ID of the meter from which the readings are taken',
        type: Number,
        required: true,
        default: 1,
    })
    counterId: number;
}
