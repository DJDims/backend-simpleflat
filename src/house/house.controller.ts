import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('houses')
@ApiTags('Houses')
export class HouseController {
    constructor(private readonly houseService: HouseService) {}

    @Post()
    @ApiOperation({ summary: 'Create house' })
    @ApiResponse({ status: 201, description: 'Created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    create(@Body() createHouseDto: CreateHouseDto) {
        return this.houseService.create(createHouseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all houses' })
    @ApiResponse({ status: 200, description: 'OK' })
    findAll() {
        return this.houseService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find house by id' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Not found' })
    findOne(@Param('id') id: string) {
        return this.houseService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update house' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 409, description: 'Conflict' })
    update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
        return this.houseService.update(+id, updateHouseDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete house' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Not found' })
    remove(@Param('id') id: string) {
        return this.houseService.remove(+id);
    }
}
