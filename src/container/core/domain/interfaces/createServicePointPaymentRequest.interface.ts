import { SubscriptionType } from '@domain/enums/subscriptionType.enum';

export interface CreateServicePointPaymentRequest {
  servicePointId: string;
  subscriptionType: SubscriptionType;
}
