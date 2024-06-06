import { Router } from 'express';
import TelaController from './controllers/TelaController';

const routes = new Router();

routes.get('/tela', TelaController.index);

routes.post('/tela', TelaController.store);

export default routes;