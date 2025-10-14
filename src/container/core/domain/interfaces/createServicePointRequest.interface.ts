import { ServicePointType } from '@domain/enums/servicePointType.enum';

export interface CreateServicePointRequest {
  type: ServicePointType;
  price: number;
  description: string;
}
