import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createSwaggerDoc(app: NestExpressApplication) {
  const options = new DocumentBuilder()
    .setTitle('疫情防控API文档')
    .setDescription('疫情防控小程序相关的后台API接口文档')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs/api', app, document);
}
