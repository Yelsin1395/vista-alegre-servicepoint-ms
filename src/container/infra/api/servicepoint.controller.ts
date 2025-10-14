import { Controller, Delete, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ValidateBody, ValidateParams } from 'caserita-infra/packages/cdecorator';
import { FindAllQueryImpl } from '@app/queries/impl/findAll-query.impl';
import { CreateInputValidator } from '@infra/validator/createInput.validator';
import { CreateCommandImpl } from '@app/commands/impl/create-command.impl';
import { DeleteCommandImpl } from '@app/commands/impl/delete-command.impl';
import { CreateServicePointRequest } from '@domain/interfaces/createServicePointRequest.interface';
import { DeleteRequest } from '@domain/interfaces/deleteRequest.interface';
import { DeleteInputValidator } from '@infra/validator/deleteInput.validator';

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

  @Delete('/delete/:id')
  deleted(@ValidateParams(DeleteInputValidator) params: DeleteRequest) {
    return this.commandBus.execute(new DeleteCommandImpl(params));
  }
}
