import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsNumber()
  userId: Number;

  @IsNotEmpty()
  @IsNumber()
  shiftId: Number;
}
