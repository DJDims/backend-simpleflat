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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('counters')
@ApiTags('Counters')
export class CounterController {
    constructor(private readonly counterService: CounterService) {}

    @Post()
    @ApiOperation({ summary: 'Create new counter' })
    @ApiResponse({ status: 201, description: 'Created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    create(@Body() createCounterDto: CreateCounterDto) {
        return this.counterService.create(createCounterDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all counters' })
    @ApiResponse({ status: 200, description: 'OK' })
    findAll() {
        return this.counterService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find counter by id' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Not found' })
    findOne(@Param('id') id: string) {
        return this.counterService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update counter' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    update(
        @Param('id') id: string,
        @Body() updateCounterDto: UpdateCounterDto,
    ) {
        return this.counterService.update(+id, updateCounterDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete counter' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Not found' })
    remove(@Param('id') id: string) {
        return this.counterService.remove(+id);
    }
}
