import { ServicePoint } from './entities/servicepoint.entity';

export abstract class ServicePointService {
  abstract findAll(): Promise<any>;
  abstract getById(id: string): Promise<ServicePoint>;
  abstract isUnique(type: string): Promise<boolean>;
  abstract create(entity: ServicePoint): Promise<boolean>;
  abstract deleted(id: string): Promise<boolean>;
}
