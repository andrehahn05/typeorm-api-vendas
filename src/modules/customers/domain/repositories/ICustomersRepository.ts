import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';
import { SearchParams } from '@config/model_paginate/SearchParams';

export interface ICustomersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<ICustomerPaginate>;
  findByName(name: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}
export { SearchParams };
