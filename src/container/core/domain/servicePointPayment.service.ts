import { GetAllServicePointPaymentByOwmerResponse } from './interfaces/getAllServicePointPaymentByOwnerResponse.interface';
import { SubscriptionType } from './enums/subscriptionType.enum';
import { ServicePointPayment } from './entities/servicePointPayment.entity';

export abstract class ServicePointPaymentService {
  abstract getAllByOwnerId(ownerId: string): Promise<GetAllServicePointPaymentByOwmerResponse[]>;
  abstract getByOwnerId(id: string, ownerId: string): Promise<ServicePointPayment>;
  abstract isUnique(servicePointId: string, ownerId: string): Promise<boolean>;
  abstract create(entity: ServicePointPayment): Promise<boolean>;
  abstract update(entity: ServicePointPayment): Promise<boolean>;
  abstract deleted(entity: ServicePointPayment): Promise<boolean>;
}
