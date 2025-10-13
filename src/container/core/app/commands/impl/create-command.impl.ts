import { CreateServicePointRequest } from '@domain/interfaces/createServicePointRequest.interface';

export class CreateCommandImpl {
  constructor(public readonly command: CreateServicePointRequest) {}
}
