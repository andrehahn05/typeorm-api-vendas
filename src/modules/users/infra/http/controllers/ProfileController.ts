import { Request, Response } from 'express';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });
    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const UpdateProfile = container.resolve(UpdateProfileService);

    const user = await UpdateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }
}

export default ProfileController;
