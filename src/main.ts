import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { createSwaggerDoc } from './utils/swagger';

import * as env from 'dotenv';

// 从根目录 .env 文件获取配置
env.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  createSwaggerDoc(app);

  await app.listen(3000);
}

bootstrap();
