import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.repository.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async findAllPaginate(): Promise<IOrderPaginate> {
    const orders = await this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.customer', 'customer')
      .leftJoinAndSelect('orders.order_products', 'order_products')
      .paginate();

    return orders as IOrderPaginate;
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
