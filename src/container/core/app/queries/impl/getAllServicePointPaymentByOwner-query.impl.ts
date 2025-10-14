import { GetAllByOwnerRequest } from '@domain/interfaces/getAllServicePointPaymentByOwnerRequest.interface';

export class GetAllServicePointPaymentByOwnerImpl {
  constructor(public readonly query: GetAllByOwnerRequest) {}
}
