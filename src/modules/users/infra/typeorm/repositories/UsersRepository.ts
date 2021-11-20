import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Like, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });
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

  public async findAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  public async findAllPaginate(
    search: string,
    sortField: string,
  ): Promise<IPaginateUser> {
    if (search) {
      return (await this.repository
        .createQueryBuilder()
        .where([{ name: Like(`%${search}%`) }, { email: Like(`%${search}%`) }])
        .orderBy(`User.name`, 'ASC')
        .paginate()) as IPaginateUser;
    }

    return (await this.repository
      .createQueryBuilder()
      .orderBy('User.name', 'ASC')
      .paginate()) as IPaginateUser;
  }
}

export default UsersRepository;
