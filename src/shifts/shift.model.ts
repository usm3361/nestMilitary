import { Column, Model, Table } from 'sequelize-typescript';

interface ShiftCreationAttrs {
  location: string;
  startTime: string;
  endTime: string;
}

@Table
export class Shift extends Model<Shift, ShiftCreationAttrs> {

  @Column
  declare location: string;
  
  @Column
  declare startTime: string;

  @Column
  declare endTime: string;

}
