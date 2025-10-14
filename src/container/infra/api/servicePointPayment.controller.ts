import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ValidateBody } from 'caserita-infra/packages/cdecorator';
import { CreateServicePointPaymentInputValidator } from '@infra/validator/createServicePointPaymentInput.validator';
import { CreateServicePointPaymentCommandImpl } from '@app/commands/impl/createServicePointPayment-command.impl';
import { CreateServicePointPaymentRequest } from '@domain/interfaces/createServicePointPaymentRequest.interface';

@Controller('servicepointpayments')
export class ServicePointPaymentsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create')
  create(@ValidateBody(CreateServicePointPaymentInputValidator) input: CreateServicePointPaymentRequest) {
    return this.commandBus.execute(new CreateServicePointPaymentCommandImpl(input));
  }
}
