import { CreateServicePointPaymentRequest } from '@domain/interfaces/createServicePointPaymentRequest.interface';

export class CreateServicePointPaymentCommandImpl {
  constructor(public readonly command: CreateServicePointPaymentRequest) {}
}
