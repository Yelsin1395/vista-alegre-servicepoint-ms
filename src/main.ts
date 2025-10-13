import { NestFactory } from '@nestjs/core';
import { INestApplication, INestMicroservice, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService, Logger, LoggerInterceptor } from 'caserita-infra/packages/common-logger';
import {
  AppErrorResponseFilter,
  SuccessResponseInterceptor,
} from 'caserita-infra/packages/common-response';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

enum AppRunningEnvEnum {
  HTTP = 'HTTP',
  NATS = 'NATS',
}

async function bootstrap() {
  const configService = new ConfigService();
  const MICROSERVICE_NAME = configService.get<string>('MICROSERVICE_NAME');
  const APP_RUNNING_ENV = configService.get<string>('APP_RUNNING_ENV');
  const PORT = configService.get<number>('PORT');
  const NATS_SERVERS = configService.get<string>('NATS_SERVERS');
  let app: INestApplication | INestMicroservice;
  let msOk: string;

  if (APP_RUNNING_ENV === AppRunningEnvEnum.HTTP) {
    app = await NestFactory.create(AppModule);

    app.useGlobalFilters(app.get(AppErrorResponseFilter));
    app.useGlobalInterceptors(app.get(LoggerInterceptor), app.get(SuccessResponseInterceptor));
    msOk = `is ready and listening on port ${PORT}`;
  }

  if (APP_RUNNING_ENV === AppRunningEnvEnum.NATS) {
    app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.NATS,
      options: {
        servers: NATS_SERVERS?.split(','),
      },
    });

    app.useGlobalInterceptors(app.get(LoggerInterceptor));
    msOk = 'has been successfully raised and is ready to process events';
  }

  app.useLogger(app.get(AppLoggerService));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const logger = app.get(Logger);

  await app.listen(APP_RUNNING_ENV === AppRunningEnvEnum.HTTP && PORT);

  logger.info(`Microservice ${MICROSERVICE_NAME} ${msOk}.`);
}
bootstrap();
