import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { UsersDto } from './users-dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRipo: UsersRepository) {}

  find(id: number): Promise<Users> {
    return this.usersRipo.findOne(id);
  }

  findByEmail(email: string): Promise<Users> {
    return this.usersRipo.findByEmail(email);
  }
}
