import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @Roles(Role.Commander)
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  @Get()
  findAll() {
    return this.shiftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Commander)
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftsService.update(+id, updateShiftDto);
  }

  @Delete(':id')
  @Roles(Role.Commander)
  remove(@Param('id') id: string) {
    return this.shiftsService.remove(+id);
  }
}
