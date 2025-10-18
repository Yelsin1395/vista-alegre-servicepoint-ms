import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteServicePointPaymentCommandImpl } from '../impl/deleteServicePointPayment-command.impl';
import { ServicePointPaymentService } from '@domain/servicePointPayment.service';

@CommandHandler(DeleteServicePointPaymentCommandImpl)
export class DeleteServicePointPaymentCommandHandler
  implements ICommandHandler<DeleteServicePointPaymentCommandImpl>
{
  constructor(private readonly service: ServicePointPaymentService) {}

  async execute({ command }: DeleteServicePointPaymentCommandImpl): Promise<boolean> {
    const entity = await this.service.getByOwnerId(command.id, command.ownerId);

    entity.isDeleted = true;

    return this.service.deleted(entity);
  }
}
