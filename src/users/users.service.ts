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
    return this.userModel.findOne({
      where: { username },
      raw: true,
    });
  }

  async create(
    username: string,
    pass: string,
    role: string = 'soldier',
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);
    const newUser = await this.userModel.create({
      username: username,
      password: hash,
      role: role,
    });
    return newUser.get({ plain: true });
  }

  findAll(): Promise<User[] | null> {
    return this.userModel.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      await user.destroy();
    }
  }
}
