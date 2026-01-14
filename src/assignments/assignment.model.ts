import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Assignment extends Model<Assignment> {
  @Column
  declare userId: string;

  @Column
  declare shiftId: string;
}
