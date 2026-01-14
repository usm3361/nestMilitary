import { Injectable } from '@nestjs/common';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { CreateShiftDto } from './dto/create-shift.dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift)
    private shiftModel: typeof Shift,
  ) {}

  create(createShiftDto): Promise<Shift | null> {
    return this.shiftModel.create(createShiftDto);
  }

  findAll(): Promise<Shift[] | null> {
    return this.shiftModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} shift`;
  }

  update(id: number, updateShiftDto: UpdateShiftDto) {
    return `This action updates a #${id} shift`;
  }

  remove(id: number) {
    return `This action removes a #${id} shift`;
  }
}
