import { Request, Response } from 'express';
import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';
import { container } from 'tsyringe';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordEmail = container.resolve(ForgotPasswordService);

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
