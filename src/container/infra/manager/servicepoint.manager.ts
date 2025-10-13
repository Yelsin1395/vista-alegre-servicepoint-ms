import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DatabaseConnectionType } from 'caserita-infra/packages/common-database';
import { ServicePointService } from '@domain/servicepoint.service';
import { ServicePoint } from '@domain/entities/servicepoint.entity';

@Injectable()
export class ServicePointManager implements ServicePointService {
  constructor(
    @InjectRepository(ServicePoint, DatabaseConnectionType.MONGODB_CONNECTION)
    private readonly repository: MongoRepository<ServicePoint>,
  ) {}

  async findAll(): Promise<ServicePoint[]> {
    return this.repository.find();
  }

  async create(entity: ServicePoint): Promise<boolean> {
    const result = await this.repository.save(entity);

    return !!String(result.id);
  }
}
