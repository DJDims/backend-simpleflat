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
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@Controller('cities')
@ApiTags('Cities')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Post()
    @UseGuards(JwtAuthGuard, IsAdminGuard)
    @ApiOperation({ summary: 'Create new city' })
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'Created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    create(@Body() createCityDto: CreateCityDto) {
        return this.cityService.create(createCityDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all cities' })
    @ApiResponse({ status: 200, description: 'OK' })
    findAll() {
        return this.cityService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find city by id' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Not found' })
    findOne(@Param('id') id: string) {
        return this.cityService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, IsAdminGuard)
    @ApiOperation({ summary: 'Update city' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
        return this.cityService.update(+id, updateCityDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, IsAdminGuard)
    @ApiOperation({ summary: 'Delete city' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not found' })
    remove(@Param('id') id: string) {
        return this.cityService.remove(+id);
    }
}
