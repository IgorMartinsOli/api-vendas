import { Router } from 'express';
import productRouter from '@modules/products/routes/productsRoutes';

const routes = Router();

routes.use('/products', productRouter);

export default routes;