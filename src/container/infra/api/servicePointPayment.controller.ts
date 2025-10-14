import { Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ValidateBody, ValidateParams } from 'caserita-infra/packages/cdecorator';
import { CreateServicePointPaymentInputValidator } from '@infra/validator/createServicePointPaymentInput.validator';
import { GetAllServicePointPaymentByOwnerImpl } from '@app/queries/impl/getAllServicePointPaymentByOwner-query.impl';
import { CreateServicePointPaymentCommandImpl } from '@app/commands/impl/createServicePointPayment-command.impl';
import { GetAllByOwnerRequest } from '@domain/interfaces/getAllServicePointPaymentByOwnerRequest.interface';
import { CreateServicePointPaymentRequest } from '@domain/interfaces/createServicePointPaymentRequest.interface';
import { GetAllServicePointPaymentInputValidator } from '@infra/validator/getAllServicePointPaymentInput.validator';

@Controller('servicepointpayments')
export class ServicePointPaymentsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/list/:ownerId')
  getAllByOwnerId(
    @ValidateParams(GetAllServicePointPaymentInputValidator) params: GetAllByOwnerRequest,
  ) {
    return this.queryBus.execute(new GetAllServicePointPaymentByOwnerImpl(params));
  }

  @Post('/create')
  create(
    @ValidateBody(CreateServicePointPaymentInputValidator) input: CreateServicePointPaymentRequest,
  ) {
    return this.commandBus.execute(new CreateServicePointPaymentCommandImpl(input));
  }
}
