import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ServicePointType } from '@domain/enums/servicePointType.enum';

export class CreateInputValidator {
  @IsEnum(ServicePointType, { message: 'Invalid service type provide.' })
  public type: ServicePointType;

  @IsNumber()
  public price: number;

  @IsString()
  public description: string;
}
