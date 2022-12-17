import { SearchParams } from '@config/model_paginate/SearchParams';
import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';
import { IOrderPaginate } from '../models/IOrderPaginate';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IOrderPaginate>;
  create(data: ICreateOrder): Promise<IOrder>;
}
