import { ServicePoint } from './entities/servicepoint.entity';

export abstract class ServicePointService {
  abstract findAll(): Promise<any>;
  abstract getById(id: string): Promise<ServicePoint>;
  abstract create(entity: ServicePoint): Promise<boolean>;
}
