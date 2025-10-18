import { GetAllServicePointPaymentByOwmerResponse } from './interfaces/getAllServicePointPaymentByOwnerResponse.interface';
import { ServicePointPayment } from './entities/servicePointPayment.entity';

export abstract class ServicePointPaymentService {
  abstract getAllByOwnerId(ownerId: string): Promise<GetAllServicePointPaymentByOwmerResponse[]>;
  abstract isUnique(servicePointId: string, ownerId: string): Promise<boolean>;
  abstract create(entity: ServicePointPayment): Promise<boolean>;
  abstract deletedByOwnerId(id: string, ownerId: string): Promise<boolean>;
}
