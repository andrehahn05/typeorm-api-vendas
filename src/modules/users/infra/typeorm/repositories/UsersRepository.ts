import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import User from '../entities/User';
import { SearchParams } from '@config/model_paginate/SearchParams';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ name });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.repository.create({ name, email, password });

    await this.repository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.repository.save(user);

    return user;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const [users, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    };

    return result;
  }
}

export default UsersRepository;
