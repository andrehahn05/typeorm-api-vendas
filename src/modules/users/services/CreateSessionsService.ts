import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import authConfig from '@config/auth';
import { sign, Secret } from 'jsonwebtoken';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { ICreateSession } from '../domain/models/ICreateSession';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password !', 401);
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError('Incorrect email/password !', 401);
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
