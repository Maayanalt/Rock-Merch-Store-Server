import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  availableEmail(email: string) {
    if (this.usersService.findByEmail(email)) return false;
    return true;
  }

  async validateUser(email: string, password: string) {
    console.log('auth');
    const user = await this.usersService.findByEmail(email);
    let id = 0;
    if (user) {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) id = user.id;
      });
    }
    return id;
  }
}
