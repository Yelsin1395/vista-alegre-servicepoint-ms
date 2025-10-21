import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpStatus, Logger } from '@nestjs/common';
import { CatalogCode, getCatalogDescription } from '@app/exceptions/catalog.exception';
import { subscriptionDurationByType } from '@app/common/mappers/subscriptionDurationsByType.mapper';
import { CreateServicePointPaymentCommandImpl } from '@app/commands/impl/createServicePointPayment-command.impl';
import { ServicePointService } from '@domain/servicepoint.service';
import { StatusServicePointPayment } from '@domain/enums/statusServicePointPaymentType.enum';
import { ServicePointPaymentService } from '@domain/servicePointPayment.service';
import { ServicePointPayment } from '@domain/entities/servicePointPayment.entity';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateServicePointPaymentCommandImpl)
export class CreateServicePointPaymentCommandHandler implements ICommandHandler<CreateServicePointPaymentCommandImpl> {
  private readonly logger: Logger = new Logger('CreateServicePointPaymentCommandHandler');

  constructor(
    private readonly servicePointService: ServicePointService,
    private readonly service: ServicePointPaymentService
  ) {}

  async execute({ command }: CreateServicePointPaymentCommandImpl): Promise<boolean> {
    const entity = new ServicePointPayment();

    if (await this.service.isUnique(command.servicePointId, command.ownerId)) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        errorCode: CatalogCode.ERROR_SERVICE_POINT_PAYMENT_ALREADY_EXIST_400,
        message: getCatalogDescription(CatalogCode.ERROR_SERVICE_POINT_PAYMENT_ALREADY_EXIST_400),
      });
    }

    this.logger.log('[ServicePointService - getById]: Ask the service point if it is active.')
    const servicePoint = await this.servicePointService.getById(command.servicePointId);

    if (servicePoint.isDeleted) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        errorCode: CatalogCode.ERROR_SERVICE_POINT_REMOVE_404,
        message: getCatalogDescription(CatalogCode.ERROR_SERVICE_POINT_REMOVE_404)
      });
    }

    if (!servicePoint.isEnabled) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        errorCode: CatalogCode.ERROR_SERVICE_POINT_DISABLED_400,
        message: getCatalogDescription(CatalogCode.ERROR_SERVICE_POINT_DISABLED_400)
      });
    }

    entity.servicePoints_id = servicePoint._id;
    entity.owners_id = command.ownerId;
    entity.subscriptionType = command.subscriptionType;
    entity.billingPeriodInMonths = subscriptionDurationByType[command.subscriptionType];
    entity.totalPaymentBySubscription = subscriptionDurationByType[command.subscriptionType] * servicePoint.price;
    entity.serviceStatus = StatusServicePointPayment.NEW;

    return this.service.create(entity);
  }
}
