import { DeleteRequest } from '@domain/interfaces/deleteRequest.interface';

export class DeleteCommandImpl {
  constructor(public readonly command: DeleteRequest) {}
}
