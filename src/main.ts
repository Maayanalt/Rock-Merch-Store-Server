import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );
  //To configure Fastify, which is Express competitor:
  // const app = await NestFactory.create<NestFastifyApplication>(
  // AppModule,
  // new FastifyAdapter(),
  // );
  app.setGlobalPrefix('api');
  await app.listen(3200);
}
bootstrap();
