import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidatePayload } from 'caserita-infra/packages/cdecorator';
import { CreateCommandImpl } from '@app/commands/impl/create-command.impl';
import { FindAllQueryImpl } from '@app/queries/impl/findAll-query.impl';
import { CreateInputValidator } from '@infra/validator/createInput.validator';

@Controller('servicepoints')
export class ServicePointHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'ms.servicepoint.findAll' })
  async findAll() {
    return this.queryBus.execute(new FindAllQueryImpl());
  }

  @MessagePattern({ cmd: 'ms.servicepoint.create' })
  async create(@Payload() @ValidatePayload(CreateInputValidator) payload) {
    return this.commandBus.execute(new CreateCommandImpl(payload));
  }
}
