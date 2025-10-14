import { ServicePointPayment } from '@domain/entities/servicePointPayment.entity';

export interface GetAllServicePointPaymentByOwmerResponse extends ServicePointPayment {
  servicePointType: string;
  servicePointPrice: number;
  servicePointDescription: string;
  servicePointcreatedAt: Date;
  servicePointupdatedAt: Date;
}
