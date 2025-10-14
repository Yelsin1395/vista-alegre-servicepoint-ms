import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseConnectionType } from 'caserita-infra/packages/common-database';
import { ServicePointPaymentMapper } from '@app/common/mappers/servicePointPayment.mapper';
import { ServicePointPaymentService } from '@domain/servicePointPayment.service';
import { ServicePointPayment } from '@domain/entities/servicePointPayment.entity';
import { ServicePoint } from '@domain/entities/servicepoint.entity';
import { GetAllServicePointPaymentByOwmerResponse } from '@domain/interfaces/getAllServicePointPaymentByOwnerResponse.interface';

@Injectable()
export class ServicePointPaymentManager implements ServicePointPaymentService {
  constructor(
    @InjectRepository(ServicePointPayment, DatabaseConnectionType.POSTGRES_CONNECTION)
    private readonly repository: Repository<ServicePointPayment>,
  ) {}

  async getAllByOwnerId(ownerId: string): Promise<GetAllServicePointPaymentByOwmerResponse[]> {
    const rawResult = await this.repository
      .createQueryBuilder('spp')
      .leftJoinAndSelect(ServicePoint, 'sp', 'sp._id = spp.servicePoints_id')
      .select(['spp._id AS _id', 'spp.servicePoints_id AS servicepoints_id', 'spp.owners_id AS owners_id', 'spp.lastPayment AS lastpayment', 'spp.nextPayment AS nextpayment', 'spp.subscriptionType AS subscriptiontype', 'spp.billingPeriodInMonths AS billingperiodinmonths', 'spp.serviceStatus AS servicestatus', 'spp.isEnabled AS isenabled', 'spp.createdAt AS createdat', 'spp.updatedAt AS updatedat', 'sp.type AS servicepointtype', 'sp.price AS servicepointprice', 'sp.description AS servicepointdescription', 'sp.createdAt AS servicepointcreatedat', 'sp.updatedAt AS servicepointupdatedat'])
      .where('spp.owners_id = :ownerId', { ownerId })
      .getRawMany<GetAllServicePointPaymentByOwmerResponse>();
    return rawResult.map(ServicePointPaymentMapper.toServicePointPaymentByOwmerResponse);
  }

  async create(entity: ServicePointPayment): Promise<boolean> {
    const result = await this.repository.save(entity);
    return !!String(result._id);
  }
}
