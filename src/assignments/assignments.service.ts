import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Assignment } from './assignment.model';
import { Shift } from 'src/shifts/shift.model';
import { User } from 'src/users/user.model';
import { Role } from 'src/users/enums/role.enum';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private assignmentModel: typeof Assignment,
  ) { }

  async create(createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentModel.create({
      userId: createAssignmentDto.userId,
      shiftId: createAssignmentDto.shiftId,
    });
  }

  async findAll(user: any) {
    const includeOptions = [
      { model: Shift },
      { model: User, attributes: ['username'] },
    ];

    if (user.role === Role.Commander) {
      return this.assignmentModel.findAll({
        include: includeOptions,
      });
    }
    return this.assignmentModel.findAll({
      where: { userId: user.id },
      include: includeOptions
    });
  }

async findOne(id: number) {
    const assignment = await this.assignmentModel.findByPk(id);
    if (!assignment) {
      throw new NotFoundException(`assignment #${id} not found`);
    }
    return assignment;
  }

async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const assignment = await this.findOne(id);
    await assignment.update(updateAssignmentDto);
    return assignment;
  }

  async remove(id: number) {
    const assignment = await this.findOne(id);
    await assignment.destroy();
    return { message: 'assignment deleted successfully' };
  }}
