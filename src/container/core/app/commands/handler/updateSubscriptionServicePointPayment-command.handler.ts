import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Logger } from '@nestjs/common';
import { UpdateSubscriptionServicePointPaymentCommandImpl } from '@app/commands/impl/updateSubscriptionServicePointPayment-command.impl';
import { subscriptionDurationByType } from '@app/common/mappers/subscriptionDurationsByType.mapper';
import { CatalogCode, getCatalogDescription } from '@app/exceptions/catalog.exception';
import { ServicePointService } from '@domain/servicepoint.service';
import { ServicePointPaymentService } from '@domain/servicePointPayment.service';

@CommandHandler(UpdateSubscriptionServicePointPaymentCommandImpl)
export class UpdateSubscriptionServicePointPaymentCommandHandler
  implements ICommandHandler<UpdateSubscriptionServicePointPaymentCommandImpl>
{
  private readonly logger: Logger = new Logger('UpdateSubscriptionServicePointPaymentCommandHandler');

  constructor(
    private readonly servicePointService: ServicePointService,
    private readonly service: ServicePointPaymentService,
  ) {}

  async execute({ command }: UpdateSubscriptionServicePointPaymentCommandImpl): Promise<boolean> {
    this.logger.log('[ServicePointService - getById]: Ask the service point if it is active.')
    const servicePoint = await this.servicePointService.getById(command.servicePointId);

    if (!servicePoint) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        errorCode: CatalogCode.ERROR_SERVICE_POINT_REMOVE_404,
        message: getCatalogDescription(CatalogCode.ERROR_SERVICE_POINT_REMOVE_404),
      });
    }

    if (!servicePoint.isEnabled) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        errorCode: CatalogCode.ERROR_SERVICE_POINT_DISABLED_400,
        message: getCatalogDescription(CatalogCode.ERROR_SERVICE_POINT_DISABLED_400),
      });
    }

    const entity = await this.service.getByOwnerId(command.id, command.ownerId);

    entity.subscriptionType = command.subscriptionType;
    entity.billingPeriodInMonths = subscriptionDurationByType[command.subscriptionType];
    entity.totalPaymentBySubscription = subscriptionDurationByType[command.subscriptionType] * servicePoint.price;

    return this.service.update(entity);
  }
}
