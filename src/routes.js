import { Router } from 'express';
import TelaController from './controllers/TelaController';

const routes = new Router();

routes.get('/tela', headerCors,  TelaController.index);

routes.post('/tela', headerCors, TelaController.store);

function headerCors(req, res, next) {
    res.set("Access-Control-Allow-Origin", "127.0.0.1:5500");
    next();
}

export default routes;