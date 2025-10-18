import { IsUUID } from 'class-validator';

export class DeleteServicePointPaymentInputValidator {
  @IsUUID()
  public id: string;

  @IsUUID()
  public ownerId: string;
}
