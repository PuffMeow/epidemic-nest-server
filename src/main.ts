import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { createSwaggerDoc } from './utils/swagger';
import { HttpExceptionFilter } from './filter/http-exception.filter';

import * as env from 'dotenv';
import { TransformInterceptor } from './interceptor/transform.interceptor';

// 从根目录 .env 文件获取配置
env.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  createSwaggerDoc(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}

bootstrap();
