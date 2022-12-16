import { IUserToken } from '../models/IUserToken';

export interface IUserTokensRepository {
  findByTk(token: string): Promise<IUserToken | null>;
  generate(user_id: string): Promise<IUserToken>;
}
