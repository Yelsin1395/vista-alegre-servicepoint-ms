import { ServicePointPayment } from './entities/servicePointPayment.entity';

export abstract class ServicePointPaymentService {
  abstract create(entity: ServicePointPayment): Promise<boolean>;
}
