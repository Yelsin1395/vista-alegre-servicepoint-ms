import { IsString } from 'class-validator';

export class CreateInputValidator {
  @IsString()
  public name: string;
}
