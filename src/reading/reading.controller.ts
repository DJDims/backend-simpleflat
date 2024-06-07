import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ReadingService } from './reading.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('readings')
@ApiTags('Readings')
export class ReadingController {
    constructor(private readonly readingService: ReadingService) {}

    @Post()
    @ApiOperation({ summary: 'Create new reading' })
    create(@Body() createReadingDto: CreateReadingDto) {
        return this.readingService.create(createReadingDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all readings' })
    findAll() {
        return this.readingService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find reading by id' })
    findOne(@Param('id') id: string) {
        return this.readingService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update reading' })
    update(
        @Param('id') id: string,
        @Body() updateReadingDto: UpdateReadingDto,
    ) {
        return this.readingService.update(+id, updateReadingDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete reading' })
    remove(@Param('id') id: string) {
        return this.readingService.remove(+id);
    }
}
