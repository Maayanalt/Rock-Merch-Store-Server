import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cart } from 'src/cart/entities/cart.entity';
import { ValidatePasswordMiddleware } from 'src/middlewares/validate-password.middleware';
import { ValidateEmailMiddleware } from 'src/middlewares/validate-email.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, Cart]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidatePasswordMiddleware)
      .forRoutes({ path: 'users/update', method: RequestMethod.PATCH });

    consumer
      .apply(ValidateEmailMiddleware)
      .forRoutes({ path: 'users/register', method: RequestMethod.POST });
  }
}
