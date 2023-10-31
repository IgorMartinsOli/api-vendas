import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/productsRoutes';
import usersRouter from '@modules/users/routes/UsersRoutes';
import sessionsRouter from '@modules/users/routes/SessionsRoutes';


const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;