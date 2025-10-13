import { ServicePoint } from './entities/servicepoint.entity'

export abstract class ServicePointService {
  abstract findAll(): Promise<any>;
  abstract create(input: ServicePoint): Promise<boolean>;
}