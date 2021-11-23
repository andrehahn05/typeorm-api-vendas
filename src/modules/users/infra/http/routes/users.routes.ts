import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserController from '../controllers/UserController';
import authenticated from '@shared/infra/http/middlewares/authenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRoutes = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRoutes.get('/', authenticated, userController.index);

usersRoutes.get(
  '/:id',
  authenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.show,
);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRoutes.patch(
  '/avatar',
  authenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRoutes;
