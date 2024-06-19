import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ReadingService } from './reading.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('readings')
@UseGuards(JwtAuthGuard)
@ApiTags('Readings')
@ApiBearerAuth()
export class ReadingController {
    constructor(private readonly readingService: ReadingService) {}

    @Post()
    @ApiOperation({ summary: 'Create new reading' })
    @ApiResponse({ status: 201, description: 'Created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    create(@Body() createReadingDto: CreateReadingDto) {
        return this.readingService.create(createReadingDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all readings' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    findAll() {
        return this.readingService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find reading by id' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not found' })
    findOne(@Param('id') id: string) {
        return this.readingService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update reading' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    update(
        @Param('id') id: string,
        @Body() updateReadingDto: UpdateReadingDto,
    ) {
        return this.readingService.update(+id, updateReadingDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete reading' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not found' })
    remove(@Param('id') id: string) {
        return this.readingService.remove(+id);
    }
}
