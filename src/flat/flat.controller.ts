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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('flats')
@ApiTags('Flats')
export class FlatController {
    constructor(private readonly flatService: FlatService) {}

    @Post()
    @ApiOperation({ summary: 'Create new flat' })
    create(@Body() createFlatDto: CreateFlatDto) {
        return this.flatService.create(createFlatDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all flats' })
    findAll() {
        return this.flatService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find flat by id' })
    findOne(@Param('id') id: string) {
        return this.flatService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update flat' })
    update(@Param('id') id: string, @Body() updateFlatDto: UpdateFlatDto) {
        return this.flatService.update(+id, updateFlatDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete flat' })
    remove(@Param('id') id: string) {
        return this.flatService.remove(+id);
    }
}
