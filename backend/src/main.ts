import { NestFactory } from '@nestjs/core';
import express from 'express';
// import express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use('/uploads', express.define(join(__dirname, '..', 'uploads')));
  await app.listen(5000);
}
bootstrap();
