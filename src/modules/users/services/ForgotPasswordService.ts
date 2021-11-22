import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';

@injectable()
class ForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const userToken = await this.userTokensRepository.generate(user.id);
    // console.log(userToken);

    await EtherealMail.sendMail({
      to: email,
      body: `Password Reset Request ${userToken?.token} `,
    });
  }
}

export default ForgotPasswordService;
