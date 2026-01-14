import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user || !user.password) {
      throw new UnauthorizedException('');
    }
    const byc = await bcrypt.compare(pass, user.password);
    if (!byc) {
      throw new UnauthorizedException('');
    }

    const { password, ...rest } = user;
    const payload = rest;
    return { access_token: await this.jwtService.signAsync(payload) };
  }
  async signUp(userModel: User): Promise<User | null> {
    const user = await this.usersService.createUser(userModel);
    return user;
  }
}
