import { GetAllServicePointPaymentByOwmerResponse } from './interfaces/getAllServicePointPaymentByOwnerResponse.interface';
import { ServicePointPayment } from './entities/servicePointPayment.entity';

export abstract class ServicePointPaymentService {
  abstract getAllByOwnerId(ownerId: string): Promise<GetAllServicePointPaymentByOwmerResponse[]>;
  abstract create(entity: ServicePointPayment): Promise<boolean>;
}
