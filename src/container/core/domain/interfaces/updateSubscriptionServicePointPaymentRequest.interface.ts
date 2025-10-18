import { SubscriptionType } from '@domain/enums/subscriptionType.enum';

export interface UpdateSubscriptionServicePointRequest {
  id?: string;
  servicePointId: string;
  ownerId: string;
  subscriptionType: SubscriptionType;
}
