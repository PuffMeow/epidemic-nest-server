import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { createSwaggerDoc } from './lib/utils/swagger';
import { HttpExceptionFilter } from './filter/http-exception.filter';

import * as env from 'dotenv';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
import { AllExceptionsFilter } from './filter/any-exception.filter';

// 从根目录 .env 文件获取配置
env.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  createSwaggerDoc(app);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  // 日志中间件
  app.use(logger);
  await app.listen(3000);
}

bootstrap();
