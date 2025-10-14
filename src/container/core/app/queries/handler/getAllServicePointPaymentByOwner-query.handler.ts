import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllServicePointPaymentByOwnerImpl } from '@app/queries/impl/getAllServicePointPaymentByOwner-query.impl';
import { ServicePointPaymentService } from '@domain/servicePointPayment.service';

@QueryHandler(GetAllServicePointPaymentByOwnerImpl)
export class GetAllServicePointPaymentByOwnerHanlder implements IQueryHandler<GetAllServicePointPaymentByOwnerImpl> {
  constructor(private readonly service: ServicePointPaymentService) {}

  async execute({ query }: GetAllServicePointPaymentByOwnerImpl): Promise<any> {
    return this.service.getAllByOwnerId(query.ownerId);
  }
}
