import { Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftsService {
  private shifts: Shift[] = [
    { id: 1, location: 'Main Gate', startTime: '08:00', endTime: '12:00' },
  ]
  create(createShiftDto: CreateShiftDto) {
    const newShift: Shift = {
      id: this.shifts.length + 1,
      ...createShiftDto,
    }
    this.shifts.push(newShift)
    return newShift;
  }

  findAll():Shift[] {
    return this.shifts;
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
