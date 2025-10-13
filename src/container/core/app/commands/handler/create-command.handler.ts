import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommandImpl } from '@app/commands/impl/create-command.impl';
import { ServicePointService } from '@domain/servicepoint.service';
import { ServicePoint } from '@domain/entities/servicepoint.entity';

@CommandHandler(CreateCommandImpl)
export class CreateCommandHandler implements ICommandHandler<CreateCommandImpl> {
  constructor(private readonly service: ServicePointService) {}

  async execute({ command }: CreateCommandImpl): Promise<any> {
    const entity = new ServicePoint();

    entity.name = command.name;

    return this.service.create(entity);

  }
}
