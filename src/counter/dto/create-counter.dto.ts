import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCounterDto {
    @IsString()
    @ApiProperty({
        description: 'Counter name',
        type: String,
        required: true,
        default: 'Bathroom',
    })
    name: string;

    @IsNumber()
    @ApiProperty({
        description: 'ID of the apartment where this meter is located',
        type: Number,
        required: true,
        default: 1,
    })
    flatId: number;
}
