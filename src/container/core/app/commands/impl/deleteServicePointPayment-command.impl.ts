import { DeleteServicePointPaymentRequest } from '@domain/interfaces/deleteServicePointPaymentRequest';

export class DeleteServicePointPaymentCommandImpl {
  constructor(public readonly command: DeleteServicePointPaymentRequest) {}
}
