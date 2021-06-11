import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const passport = require('passport');
//const morgan = require('morgan');
//import { Logger } from '@nest/common';
//import * as session from 'express-session';
//const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
/*import * as express from 'express';
const path = require('path');*/

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(morgan('combined'));
  //app.use(cookieParser());
  //app.use(bodyParser.json());
  //app.use(bodyParser.urlencoded({ extended: false }));

  /*app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );*/
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  //const logger = new Logger();
  app.setGlobalPrefix('api/v1');
  //app.use(express.static(path.join(__dirname, 'public')));
  //app.use(express.static(path.join(__dirname, 'uploads')));
  const config = new DocumentBuilder()
    .setTitle('bolt')
    .setDescription('bolt API description')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
        name: 'bearer',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
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
