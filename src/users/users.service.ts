import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
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
