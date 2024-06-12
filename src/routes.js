import { Router } from 'express';
import TelaController from './controllers/TelaController';

const routes = new Router();

routes.get('/tela', headerCors, TelaController.index);

routes.post('/tela', headerCors, TelaController.store);

function headerCors(req, res, next) {
    res.set("Access-Control-Allow-Origin", "https://joaodinizaraujo.github.io");
    next();
}

export default routes;