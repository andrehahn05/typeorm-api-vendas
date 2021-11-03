import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passowrdRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passowrdRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPasswordController.create,
);

export default passowrdRouter;
