import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes ';
import passowrdRouter from '@modules/users/infra/http/routes/password.routes ';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRoutes);
routes.use('/signin', sessionsRoutes);
routes.use('/password', passowrdRouter);
routes.use('/profile', profileRoutes);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
