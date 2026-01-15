import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Role } from 'src/users/enums/role.enum';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift)
    private shiftModel: typeof Shift,
  ) {}

  async create(createShiftDto: CreateShiftDto) {
    return this.shiftModel.create(createShiftDto);
  }

  async findAll() {
    return this.shiftModel.findAll();
  }

  async findOne(id: number) {
    const shift = await this.shiftModel.findByPk(id);
    if (!shift) {
      throw new NotFoundException(`Shift #${id} not found`);
    }
    return shift;
  }

  async update(id: number, updateShiftDto: UpdateShiftDto) {
    const shift = await this.findOne(id);
    await shift.update(updateShiftDto);
    return shift;
  }

  async remove(id: number) {
    const shift = await this.findOne(id);
    await shift.destroy();
    return { message: 'Shift deleted successfully' };
  }
}
