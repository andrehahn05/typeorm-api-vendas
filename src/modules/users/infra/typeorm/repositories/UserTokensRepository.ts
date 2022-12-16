import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = dataSource.getRepository(UserToken);
  }

  public async findByTk(token: string): Promise<UserToken | null> {
    const userToken = await this.repository.findOneBy({ token });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
