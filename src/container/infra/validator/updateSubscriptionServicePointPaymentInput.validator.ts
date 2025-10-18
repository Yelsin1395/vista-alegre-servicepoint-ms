import { SubscriptionType } from '@domain/enums/subscriptionType.enum';
import { IsEnum, IsUUID } from 'class-validator';

export class UpdateSubscriptionServicePointPaymentInputValidator {
  @IsUUID()
  public servicePointId: string;

  @IsUUID()
  public ownerId: string;

  @IsEnum(SubscriptionType)
  public subscriptionType: SubscriptionType;
}
