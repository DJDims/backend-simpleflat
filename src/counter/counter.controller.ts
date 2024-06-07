import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CounterService } from './counter.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('counters')
@ApiTags('Counters')
export class CounterController {
    constructor(private readonly counterService: CounterService) {}

    @Post()
    @ApiOperation({ summary: 'Create new counter' })
    create(@Body() createCounterDto: CreateCounterDto) {
        return this.counterService.create(createCounterDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all counters' })
    findAll() {
        return this.counterService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find counter by id' })
    findOne(@Param('id') id: string) {
        return this.counterService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update counter' })
    update(
        @Param('id') id: string,
        @Body() updateCounterDto: UpdateCounterDto,
    ) {
        return this.counterService.update(+id, updateCounterDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete counter' })
    remove(@Param('id') id: string) {
        return this.counterService.remove(+id);
    }
}
