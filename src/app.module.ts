import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonDatabaseModule, DatabaseConnectionType, DatabaseEnumType } from 'caserita-infra/packages/common-database';
import { CommonResponseModule } from 'caserita-infra/packages/common-response';
import { CommonLoggerModule } from 'caserita-infra/packages/common-logger';
import { ContainerModule } from './container/container.module';
import { schemaEnvVars } from '@infra/context/envs.validate';
import { ServicePoint } from '@domain/entities/servicepoint.entity';

@Module({
  imports: [
    CommonLoggerModule,
    CommonResponseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.development.local'],
      validationSchema: schemaEnvVars,
    }),
    CommonDatabaseModule.register([{
      name: DatabaseConnectionType.MONGODB_CONNECTION,
      type: DatabaseEnumType.MONGODB,
      entities: [ServicePoint]
    }]),
    ContainerModule.register(),
  ],
})
export class AppModule {}
