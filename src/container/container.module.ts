import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionType } from 'caserita-infra/packages/common-database';

// infraestructure layer
// out-persistence-adapter
import { ServicePointManager } from '@infra/manager/servicepoint.manager';
import { ServicePointPaymentManager } from '@infra/manager/servicePointPayment.manager';
// out-rest-controller-adapter
import { ServicePointController } from '@infra/api/servicepoint.controller';
import { ServicePointPaymentsController } from '@infra/api/servicePointPayment.controller';

// application layer (cqrs)
// use-case-commands
import { CreateCommandHandler } from '@app/commands/handler/create-command.handler';
import { CreateCommandImpl } from '@app/commands/impl/create-command.impl';
/// user-case-commands-service-point-payment
import { CreateServicePointPaymentCommandHandler } from '@app/commands/handler/createServicePointPayment-command.handler';
import { CreateServicePointPaymentCommandImpl } from '@app/commands/impl/createServicePointPayment-command.impl';
// use-case-queries
import { FindAllQueryHandler } from '@app/queries/handler/findAll-query.handler';
import { FindAllQueryImpl } from '@app/queries/impl/findAll-query.impl';

// domain layer
// domain-service
import { ServicePointService } from '@domain/servicepoint.service';
import { ServicePointPaymentService } from '@domain/servicePointPayment.service';
// domain-model
import { ServicePoint } from '@domain/entities/servicepoint.entity';
import { ServicePointPayment } from '@domain/entities/servicePointPayment.entity';

// The "forFeature" already creates the providers (the repositories)
const postgresRepositoryModule = TypeOrmModule.forFeature([ServicePoint, ServicePointPayment], DatabaseConnectionType.POSTGRES_CONNECTION);

@Module({
  imports: [CqrsModule, postgresRepositoryModule],
  providers: [
    CreateCommandHandler,
    CreateServicePointPaymentCommandHandler,
    CreateCommandImpl,
    CreateServicePointPaymentCommandImpl,
    FindAllQueryHandler,
    FindAllQueryImpl,
    {
      provide: ServicePointService,
      useClass: ServicePointManager,
    },
    {
      provide: ServicePointPaymentService,
      useClass: ServicePointPaymentManager,
    },
  ],
  controllers: [ServicePointController, ServicePointPaymentsController],
  exports: [
    CqrsModule,
    postgresRepositoryModule,
    ServicePointService,
    CreateCommandHandler,
    CreateServicePointPaymentCommandHandler,
    FindAllQueryHandler,
  ],
})
export class ContainerModule {}
