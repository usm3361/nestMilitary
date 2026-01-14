import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignment } from './assignment.model';

@Module({
  imports: [SequelizeModule.forFeature([Assignment])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
