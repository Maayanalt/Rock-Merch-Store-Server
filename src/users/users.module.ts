import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CartModule } from 'src/cart/cart.module';
import { Cart } from 'src/cart/entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, Cart]),
    forwardRef(() => AuthModule),
    CartModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
