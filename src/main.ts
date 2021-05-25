import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { Logger } from '@nest/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //const logger = new Logger();
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('bolt')
    .setDescription('bolt API description')
    //.addTag('BANNERS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    swaggerOptions: {
      showRequestDuration: true,
    },
  });
  app.enableCors();
  await app.listen(AppModule.port);
}
bootstrap();
