import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './config/typeorm.config';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
