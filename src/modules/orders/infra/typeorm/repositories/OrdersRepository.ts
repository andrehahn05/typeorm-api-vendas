import { Repository } from 'typeorm';
import Order from '../entities/Order';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';
import { dataSource } from '@shared/infra/typeorm';
import { SearchParams } from '@config/model_paginate/SearchParams';

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = dataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    const order = this.repository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.customer', 'customer')
      .leftJoinAndSelect('orders.order_products', 'order_products')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.repository.create({
      customer,
      order_products: products,
    });

    await this.repository.save(order);

    return order;
  }
}

export default OrdersRepository;
