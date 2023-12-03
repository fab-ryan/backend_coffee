import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import config from '@config/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, SwaggerConfig, validationPipeOptions } from '@utils';
import { I18nMiddleware } from 'nestjs-i18n';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    logger: Logger.logger,
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });
  app.enableCors();
  const validationPipe = new ValidationPipe(validationPipeOptions);
  app.useGlobalPipes(validationPipe);
  app.use(
    compression({
      level: 9,
      chunkSize: 1024 * 64,
      memLevel: 9,
    }),
  );
  app.use(I18nMiddleware);
  app.setGlobalPrefix(config().prefix);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(SwaggerConfig.title)
    .setDescription(SwaggerConfig.description)
    .setVersion(SwaggerConfig.version)
    .setTermsOfService(SwaggerConfig.termsOfService)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(config().port);
}
bootstrap();
