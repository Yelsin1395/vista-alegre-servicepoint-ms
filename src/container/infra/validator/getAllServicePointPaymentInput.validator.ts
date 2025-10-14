import { IsUUID } from 'class-validator';

export class GetAllServicePointPaymentInputValidator {
  @IsUUID()
  public ownerId: string;
}
