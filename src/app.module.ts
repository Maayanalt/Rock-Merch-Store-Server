import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { typeORMConfig } from './config/typeorm.config';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ItemsModule,
    UsersModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
