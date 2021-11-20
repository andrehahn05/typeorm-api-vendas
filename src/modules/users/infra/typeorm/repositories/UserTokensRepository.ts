import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async findByTk(token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }
}

export default UserTokensRepository;
