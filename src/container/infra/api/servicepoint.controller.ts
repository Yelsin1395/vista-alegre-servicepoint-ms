import { Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ValidateBody } from 'caserita-infra/packages/cdecorator';
import { CreateInputValidator } from '@infra/validator/createInput.validator';
import { CreateCommandImpl } from '@app/commands/impl/create-command.impl';
import { FindAllQueryImpl } from '@app/queries/impl/findAll-query.impl';
import { CreateServicePointRequest } from '@domain/interfaces/createServicePointRequest.interface';

@Controller('servicepoints')
export class ServicePointController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/list')
  findAll() {
    return this.queryBus.execute(new FindAllQueryImpl());
  }

  @Post('/create')
  create(@ValidateBody(CreateInputValidator) input: CreateServicePointRequest) {
    return this.commandBus.execute(new CreateCommandImpl(input));
  }
}
