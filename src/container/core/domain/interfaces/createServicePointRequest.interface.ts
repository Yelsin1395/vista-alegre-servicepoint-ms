import { ObjectId } from 'typeorm';

export interface CreateServicePointRequest {
  id?: ObjectId;
  name: string;
}