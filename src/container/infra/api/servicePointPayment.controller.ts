import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ValidateBody, ValidateParams } from 'caserita-infra/packages/cdecorator';
import { GetAllServicePointPaymentInputValidator } from '@infra/validator/getAllServicePointPaymentInput.validator';
import { CreateServicePointPaymentInputValidator } from '@infra/validator/createServicePointPaymentInput.validator';
import { DeleteServicePointPaymentInputValidator } from '@infra/validator/deleteServicePointPaymentInput.validator';
import { GetAllServicePointPaymentByOwnerImpl } from '@app/queries/impl/getAllServicePointPaymentByOwner-query.impl';
import { CreateServicePointPaymentCommandImpl } from '@app/commands/impl/createServicePointPayment-command.impl';
import { DeleteServicePointPaymentCommandImpl } from '@app/commands/impl/deleteServicePointPayment-command.impl';
import { GetAllByOwnerRequest } from '@domain/interfaces/getAllServicePointPaymentByOwnerRequest.interface';
import { CreateServicePointPaymentRequest } from '@domain/interfaces/createServicePointPaymentRequest.interface';
import { DeleteServicePointPaymentRequest } from '@domain/interfaces/deleteServicePointPaymentRequest';
import { UpdateSubscriptionServicePointPaymentInputValidator } from '@infra/validator/updateSubscriptionServicePointPaymentInput.validator';
import { UpdateSubscriptionServicePointPaymentCommandImpl } from '@app/commands/impl/updateSubscriptionServicePointPayment-command.impl';
import { UpdateSubscriptionServicePointRequest } from '@domain/interfaces/updateSubscriptionServicePointPaymentRequest.interface';

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

  @Patch('/update/subscription/:id')
  updateSubscription(
    @Param('id') servicePointPaymentId: string,
    @ValidateBody(UpdateSubscriptionServicePointPaymentInputValidator)
    input: UpdateSubscriptionServicePointRequest,
  ) {
    input.id = servicePointPaymentId;

    return this.commandBus.execute(new UpdateSubscriptionServicePointPaymentCommandImpl(input));
  }

  @Delete('/delete/:id/:ownerId')
  deletedByOwnerId(
    @ValidateParams(DeleteServicePointPaymentInputValidator)
    params: DeleteServicePointPaymentRequest,
  ) {
    return this.commandBus.execute(new DeleteServicePointPaymentCommandImpl(params));
  }
}
