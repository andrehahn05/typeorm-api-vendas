import { IUserToken } from '../models/IUserToken';

export interface IUserTokensRepository {
  findByTk(token: string): Promise<IUserToken | undefined>;
}
