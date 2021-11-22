import { IUserToken } from '../models/IUserToken';

export interface IUserTokensRepository {
  findByTk(token: string): Promise<IUserToken | undefined>;
  generate(user_id: string): Promise<IUserToken>;
}
