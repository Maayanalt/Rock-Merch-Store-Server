import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async pingApp(): Promise<void> {
    try {
      const response: AxiosResponse = await axios.get(
        this.configService.get('SERVER'),
      );

      console.log('Response status:', response.status);
    } catch (error) {
      console.error('Error pinging app:', error.message);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
