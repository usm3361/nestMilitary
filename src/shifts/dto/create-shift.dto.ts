import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateShiftDto {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'Start time must be a valid date string' })
  startTime: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'End time must be a valid date string' })
  endTime: string;
}
