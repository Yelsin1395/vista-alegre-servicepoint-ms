import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommandImpl } from '@app/commands/impl/delete-command.impl';
import { ServicePointService } from '@domain/servicepoint.service';

@CommandHandler(DeleteCommandImpl)
export class DeleteCommandHandler implements ICommandHandler<DeleteCommandImpl> {
  constructor(private readonly service: ServicePointService) {}

  async execute({ command }: DeleteCommandImpl): Promise<boolean> {
    const entity = await this.service.getById(command.id);

    entity.isDeleted = true;

    return this.service.deleted(entity);
  }
}
