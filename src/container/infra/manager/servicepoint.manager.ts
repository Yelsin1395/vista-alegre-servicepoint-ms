import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseConnectionType } from 'caserita-infra/packages/common-database';
import { ServicePointService } from '@domain/servicepoint.service';
import { ServicePoint } from '@domain/entities/servicepoint.entity';

@Injectable()
export class ServicePointManager implements ServicePointService {
  constructor(
    @InjectRepository(ServicePoint, DatabaseConnectionType.POSTGRES_CONNECTION)
    private readonly repository: Repository<ServicePoint>,
  ) {}
  async findAll(): Promise<ServicePoint[]> {
    return this.repository.find();
  }

  async getById(id: string): Promise<ServicePoint> {
    return this.repository.findOneBy({ _id: id });
  }

  async create(entity: ServicePoint): Promise<boolean> {
    const result = await this.repository.save(entity);
    return !!String(result._id);
  }
}
