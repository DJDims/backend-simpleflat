import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { FlatService } from './flat.service';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('flats')
@ApiTags('Flats')
export class FlatController {
    constructor(private readonly flatService: FlatService) {}

    @Post()
    @ApiOperation({ summary: 'Create new flat' })
    @ApiResponse({ status: 201, description: 'Created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    create(@Body() createFlatDto: CreateFlatDto) {
        return this.flatService.create(createFlatDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all flats' })
    @ApiResponse({ status: 200, description: 'OK' })
    findAll() {
        return this.flatService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find flat by id' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Not found' })
    findOne(@Param('id') id: string) {
        return this.flatService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update flat' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    update(@Param('id') id: string, @Body() updateFlatDto: UpdateFlatDto) {
        return this.flatService.update(+id, updateFlatDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete flat' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Not found' })
    remove(@Param('id') id: string) {
        return this.flatService.remove(+id);
    }
}
