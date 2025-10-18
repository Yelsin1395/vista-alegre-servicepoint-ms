import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteServicePointPaymentCommandImpl } from '../impl/deleteServicePointPayment-command.impl';
import { ServicePointPaymentService } from '@domain/servicePointPayment.service';

@CommandHandler(DeleteServicePointPaymentCommandImpl)
export class DeleteServicePointPaymentCommandHandler
  implements ICommandHandler<DeleteServicePointPaymentCommandImpl>
{
  constructor(private readonly service: ServicePointPaymentService) {}

  async execute({ command }: DeleteServicePointPaymentCommandImpl): Promise<boolean> {
    return this.service.deletedByOwnerId(command.id, command.ownerId);
  }
}
