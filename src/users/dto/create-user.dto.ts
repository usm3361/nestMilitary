// import { Role } from "../enums/role.enum";

// export class CreateUserDto {
//   username: string;
//   email: string;
//   password: string;
//   role: Role;
// }
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(4, { message: 'Password must be at least 4 characters' })
  password: string;

  @IsEnum(Role, { message: 'Role must be either soldier or commander' })
  role: Role;
}