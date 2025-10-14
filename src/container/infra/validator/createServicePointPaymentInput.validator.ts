import { IsEnum, IsUUID } from 'class-validator';
import { SubscriptionType } from '@domain/enums/subscriptionType.enum';

export class CreateServicePointPaymentInputValidator {
  @IsUUID()
  public servicePointId: string;

  @IsUUID()
  public ownerId: string;

  @IsEnum(SubscriptionType)
  public subscriptionType: SubscriptionType;
}
