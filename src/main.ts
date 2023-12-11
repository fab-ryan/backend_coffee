import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import config from '@config/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, SwaggerConfig, validationPipeOptions } from '@utils';
import { I18nMiddleware } from 'nestjs-i18n';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { QueryFailedFilter, HttpExceptionFilter } from '@filters';

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
  app.use(helmet());
  app.setGlobalPrefix(config().prefix);

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalFilters(
    new QueryFailedFilter(reflector),
    new HttpExceptionFilter(reflector),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle(SwaggerConfig.title)
    .setDescription(SwaggerConfig.description)
    .setVersion(SwaggerConfig.version)
    .setTermsOfService(SwaggerConfig.termsOfService)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(config().port);
}
bootstrap();
