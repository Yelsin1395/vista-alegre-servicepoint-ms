import { IsUUID } from 'class-validator';

export class DeleteInputValidator {
  @IsUUID()
  public id: string;
}
