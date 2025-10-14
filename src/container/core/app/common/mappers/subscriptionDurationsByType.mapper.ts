import { SubscriptionType } from '@domain/enums/subscriptionType.enum';

export const subscriptionDurationByType = {
  [SubscriptionType.MONTHLY]: 1,
  [SubscriptionType.BIMONTHLY]: 2,
  [SubscriptionType.QUARTERLY]: 3,
  [SubscriptionType.BIYEARLY]: 6,
  [SubscriptionType.YEARLY]: 12,
};
