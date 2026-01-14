import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOne(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { username },
      raw: true,
    });
    return user;
  }

  async createUser(userModel): Promise<User | null> {
    const { password, ...rest } = userModel;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const newUser = await this.userModel.create({
      ...rest,
      password: hash,
    });
    return newUser;
  }

  findAll(): Promise<User[] | null> {
    return this.userModel.findAll();
  }

  // findById(id: number) {
  //   return
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
