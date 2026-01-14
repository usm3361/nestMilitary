import { Column,  Model, Table } from 'sequelize-typescript';

@Table
export class Shift extends Model<Shift> {

  @Column
  declare startTime: string;

  @Column
  declare endTime: string;

  @Column
  declare location: string;
}
