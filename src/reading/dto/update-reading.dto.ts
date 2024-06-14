import { IsNotEmpty, IsNumber, IsPositive } from '@nestjs/class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReadingDto } from './create-reading.dto';

export class UpdateReadingDto extends PartialType(CreateReadingDto) {
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
}
