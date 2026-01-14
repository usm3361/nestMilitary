import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Shift } from '../shifts/shift.model';

@Table
export class Assignment extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Shift)
  @Column
  shiftId: number;

  @BelongsTo(() => Shift)
  shift: Shift;
}