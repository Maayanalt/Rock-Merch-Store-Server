import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UpdateDto } from './dto/updateUser.dto';
import { Users } from './entities/users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private usersRipo: UsersRepository,
  ) {}

  find(id: number): Promise<Users> {
    return this.usersRipo.findOne(id);
  }

  findByEmail(email: string): Promise<Users> {
    return this.usersRipo.findByEmail(email);
  }

  getPassword(id: number) {
    return this.usersRipo.findOne({ where: { id }, select: ['password'] });
  }

  async update(updates: UpdateDto, userID: number) {
    if (updates.email) {
      const validMail = await this.authService.availableEmail(updates.email);
      if (validMail)
        this.usersRipo.update({ id: userID }, { email: updates.email });
      else return false;
    }
    if (updates.newPassword) {
      const newPassword = await this.authService.hashPassword(
        updates.newPassword,
      );
      this.usersRipo.update({ id: userID }, { password: newPassword });
      return true;
    }
    return true;
  }
}
