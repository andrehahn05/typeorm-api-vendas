import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionsService';
class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userSessions = new CreateSessionService();

    const user = await userSessions.execute({
      email,
      password,
    });
    return response.json(user);
  }
}

export default SessionsController;
