import { UpdateSubscriptionServicePointRequest } from '@domain/interfaces/updateSubscriptionServicePointPaymentRequest.interface';

export class UpdateSubscriptionServicePointPaymentCommandImpl {
  constructor(public readonly command: UpdateSubscriptionServicePointRequest) {}
}
