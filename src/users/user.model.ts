import { Column, IsEmail, Model, Table } from 'sequelize-typescript';
import { Role } from './enums/role.enum';

@Table
export class User extends Model {
  @Column({
    unique: true,
  })
  declare username: string;

  @IsEmail
  @Column
  declare email: string;

  @Column
  declare password: string;

  @Column
  declare role: Role;
}
