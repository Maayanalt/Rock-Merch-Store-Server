import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const origin = configService.get('CORS_ORIGIN');
  const secret = configService.get('SECRET');

  app.enableCors({
    credentials: true,
    origin,
  });

  app.set('trust proxy', 1);
  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        domain: origin,
      },
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
