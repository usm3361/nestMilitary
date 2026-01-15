import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @Roles(Role.Commander)
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.assignmentsService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Commander)
  update(@Param('id') id: string, @Body() body: CreateAssignmentDto) {
    return this.assignmentsService.update(+id, body);
  }
  
  @Delete(':id')
  @Roles(Role.Commander)
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(+id);
  }
}
