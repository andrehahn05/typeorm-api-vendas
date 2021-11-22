import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });
    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
