import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';
import { IResetPassword } from '../domain/models/IResetPassword';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  public async execute({ password, token }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByTk(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = password;
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
