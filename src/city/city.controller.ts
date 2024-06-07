import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('cities')
@ApiTags('Cities')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Post()
    @ApiOperation({ summary: 'Create new city' })
    create(@Body() createCityDto: CreateCityDto) {
        return this.cityService.create(createCityDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all cities' })
    findAll() {
        return this.cityService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find city by id' })
    findOne(@Param('id') id: string) {
        return this.cityService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update city' })
    update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
        return this.cityService.update(+id, updateCityDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete city' })
    remove(@Param('id') id: string) {
        return this.cityService.remove(+id);
    }
}
