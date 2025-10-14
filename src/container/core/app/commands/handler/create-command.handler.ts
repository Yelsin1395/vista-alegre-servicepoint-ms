import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CatalogCode, getCatalogDescription } from '@app/exceptions/catalog.exception';
import { CreateCommandImpl } from '@app/commands/impl/create-command.impl';
import { ServicePointService } from '@domain/servicepoint.service';
import { CurrencyType } from '@domain/enums/currencyType.enum';
import { ServicePoint } from '@domain/entities/servicepoint.entity';

@CommandHandler(CreateCommandImpl)
export class CreateCommandHandler implements ICommandHandler<CreateCommandImpl> {
  constructor(private readonly service: ServicePointService) {}

  async execute({ command }: CreateCommandImpl): Promise<any> {
    const entity = new ServicePoint();

    if (await this.service.isUnique(command.type)) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        errorCode: CatalogCode.ERROR_SERVICE_POINT_ALREADY_EXIST_400,
        message: getCatalogDescription(CatalogCode.ERROR_SERVICE_POINT_ALREADY_EXIST_400),
      });
    }

    entity.type = command.type;
    entity.currency = CurrencyType.PEN;
    entity.price = command.price;
    entity.description = command.description;

    return this.service.create(entity);
  }
}
