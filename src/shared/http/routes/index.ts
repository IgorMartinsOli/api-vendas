import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/productsRoutes';


const routes = Router();

routes.use('/products', productsRouter);

export default routes;