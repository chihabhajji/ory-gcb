/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app/app.module';
import { OrySecrets } from './modules/secrets/ory.config';
import {ConfigService} from "@nestjs/config";
import swaggerInit from "./libs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: "http://localhost:4000"
  })
  const port = process.env.PORT || 3000;
  const configService = app.get<ConfigService>(ConfigService);
  const orySecrets = configService.getOrThrow('ory') as OrySecrets;
  swaggerInit(app, orySecrets);
  app.enableShutdownHooks();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
