import { Injectable } from '@nestjs/common';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';

@Injectable()
export class FlatService {
    create(createFlatDto: CreateFlatDto) {
        return 'This action adds a new flat';
    }

    findAll() {
        return `This action returns all flat`;
    }

    findOne(id: number) {
        return `This action returns a #${id} flat`;
    }

    update(id: number, updateFlatDto: UpdateFlatDto) {
        return `This action updates a #${id} flat`;
    }

    remove(id: number) {
        return `This action removes a #${id} flat`;
    }
}
