import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async availableEmail(email: string) {
    if (await this.usersService.findByEmail(email)) return false;
    return true;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    let id = 0;
    if (user) {
      if (await this.validPassword(password, user.password)) id = user.id;
    }
    return id;
  }

  validPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async validatePassword(password: string, userID: number) {
    const user = await this.usersService.getPassword(userID);
    let valid = false;
    if (user) {
      if (await this.validPassword(password, user.password)) valid = true;
    }
    return valid;
  }

  hashPassword(password: string) {
    const salt = parseInt(this.configService.get('SALT'));
    return bcrypt.hash(password, salt);
  }
}
