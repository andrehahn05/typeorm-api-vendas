import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';
import { Repository } from 'typeorm';
import Customer from '../entities/Customer';
import { dataSource } from '@shared/infra/typeorm';

class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = dataSource.getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.repository.create({ name, email });

    await this.repository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.repository.save(customer);

    return customer;
  }

  public async findAllPaginate(): Promise<ICustomerPaginate> {
    const customers = await this.repository.createQueryBuilder().paginate();

    return customers as ICustomerPaginate;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.repository.remove(customer);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.repository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.repository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.repository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}

export default CustomersRepository;
