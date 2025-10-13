import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllQueryImpl } from '../impl/findAll-query.impl';
import { ServicePointService } from '@domain/servicepoint.service';

@QueryHandler(FindAllQueryImpl)
export class FindAllQueryHandler implements IQueryHandler<FindAllQueryImpl> {
  constructor(private readonly service: ServicePointService) {}

  async execute(): Promise<any> {
    return this.service.findAll();
  }
}
