import { Router } from 'express';
import TelaController from './controllers/TelaController';

const routes = new Router();

routes.get('/tela', headerCors, TelaController.index);

routes.post('/tela', headerCors, TelaController.store);

function headerCors(req, res, next) {
    res.send("Access-Control-Allow-Origin", "*");
    next();
}

export default routes;