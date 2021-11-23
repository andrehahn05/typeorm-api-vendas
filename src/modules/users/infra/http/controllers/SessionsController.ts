import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionsService';
import { container } from 'tsyringe';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userSessions = container.resolve(CreateSessionService);

    const user = await userSessions.execute({
      email,
      password,
    });
    return response.json(classToClass(user));
  }
}

export default SessionsController;
