import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { catalogCode, getCatalogDescription } from '@app/exceptions/catalog.exception';
import { CreateServicePointPaymentCommandImpl } from '@app/commands/impl/createServicePointPayment-command.impl';
import { ServicePointService } from '@domain/servicepoint.service';
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

    this.logger.log('[ServicePointService - getById]: Ask the service point if it is active.')
    const servicePoint = await this.servicePointService.getById(command.servicePointId);

    if (servicePoint.isDeleted) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        errorCode: catalogCode.ERROR_SERVICE_POINT_REMOVE_404,
        message: getCatalogDescription(catalogCode.ERROR_SERVICE_POINT_REMOVE_404)
      });
    }

    if (!servicePoint.isEnabled) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        errorCode: catalogCode.ERROR_SERVICE_POINT_DISABLED_400,
        message: getCatalogDescription(catalogCode.ERROR_SERVICE_POINT_DISABLED_400)
      });
    }

    entity.servicePoint_id = servicePoint._id;
    entity.subscriptionType = command.subscriptionType;

    return this.service.create(entity);
  }
}
