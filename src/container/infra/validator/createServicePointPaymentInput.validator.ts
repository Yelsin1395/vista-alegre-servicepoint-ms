import { IsEnum, IsString, IsUUID } from 'class-validator';
import { SubscriptionType } from '@domain/enums/subscriptionType.enum';

export class CreateServicePointPaymentInputValidator {
  @IsString()
  @IsUUID()
  public servicePointId: string;

  @IsEnum(SubscriptionType)
  public subscriptionType: SubscriptionType;
}
