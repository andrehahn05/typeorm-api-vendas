import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRoutes from '@modules/users/routes/users.routes';
import sessionsRoutes from '@modules/users/routes/sessions.routes ';
import passowrdRouter from '@modules/users/routes/password.routes ';
import profileRoutes from '@modules/users/routes/profile.routes';
import customersRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRoutes);
routes.use('/signin', sessionsRoutes);
routes.use('/password', passowrdRouter);
routes.use('/profile', profileRoutes);
routes.use('/customers', customersRouter);

export default routes;
