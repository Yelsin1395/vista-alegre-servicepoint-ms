import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionType } from 'caserita-infra/packages/common-database';

// infraestructure layer
// out-persistence-adapter
import { ServicePointManager } from '@infra/manager/servicepoint.manager';
// out-rest-controller-adapter
import { ServicePointController } from '@infra/api/servicepoint.controller';
// out-event-adapter
import { ServicePointHandler } from '@infra/handler/servicepoint.handler';

// application layer (cqrs)
// use-case-commands
import { CreateCommandHandler } from '@app/commands/handler/create-command.handler';
import { CreateCommandImpl } from '@app/commands/impl/create-command.impl';
// use-case-queries
import { FindAllQueryHandler } from '@app/queries/handler/findAll-query.handler';
import { FindAllQueryImpl } from '@app/queries/impl/findAll-query.impl';

// domain layer
// domain-service
import { ServicePointService } from '@domain/servicepoint.service';
// domain-model
import { ServicePoint } from '@domain/entities/servicepoint.entity';

// The "forFeature" already creates the providers (the repositories)
const mongoRepositoryModule = TypeOrmModule.forFeature([ServicePoint], DatabaseConnectionType.MONGODB_CONNECTION);

@Module({
  imports: [CqrsModule, mongoRepositoryModule],
  providers: [
    CreateCommandHandler,
    CreateCommandImpl,
    FindAllQueryHandler,
    FindAllQueryImpl,
    {
      provide: ServicePointService,
      useClass: ServicePointManager,
    },
  ],
  controllers: [],
  exports: [CqrsModule, mongoRepositoryModule, ServicePointService, CreateCommandHandler, FindAllQueryHandler],
})
export class ContainerModule {
  static register() {
    const configService = new ConfigService();
    const APP_RUNNING_ENV = configService.get<string>('APP_RUNNING_ENV');

    return {
      module: ContainerModule,
      controllers: APP_RUNNING_ENV === 'HTTP' ? [ServicePointController] : [ServicePointHandler],
    };
  }
}
