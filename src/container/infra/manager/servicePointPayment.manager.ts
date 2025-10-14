import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseConnectionType } from 'caserita-infra/packages/common-database';
import { ServicePointPaymentService } from '@domain/servicePointPayment.service';
import { ServicePointPayment } from '@domain/entities/servicePointPayment.entity';

@Injectable()
export class ServicePointPaymentManager implements ServicePointPaymentService {
  constructor(
    @InjectRepository(ServicePointPayment, DatabaseConnectionType.POSTGRES_CONNECTION)
    private readonly repository: Repository<ServicePointPayment>,
  ) {}

  async create(entity: ServicePointPayment): Promise<boolean> {
    const result = await this.repository.save(entity);
    return !!String(result._id);
  }
}
