import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrderPaginate } from '../domain/models/IOrderPaginate';
import { IParams } from '@config/model_paginate/IParams';

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ page, limit }: IParams): Promise<IOrderPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const orders = await this.ordersRepository.findAll({
      page,
      skip,
      take,
    });

    return orders;
  }
}

export default ListOrderService;
