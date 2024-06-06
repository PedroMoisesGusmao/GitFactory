import { Router } from 'express';
import TelaController from './controllers/TelaController';

const routes = new Router();

routes.get('/tela', headerCors,  TelaController.index);

routes.post('/tela', headerCors, TelaController.store);

export default routes;