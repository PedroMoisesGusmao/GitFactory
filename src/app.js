import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
require('dotenv').config();

class App{
    constructor(){
        this.server = express();

        mongoose.connect(`mongodb+srv://pedroaraujo4910:${process.env.MONGODB_PASSWORD}@gitfactory-telas.qwcr6fw.mongodb.net/?retryWrites=true&w=majority&appName=GitFactory-Telas`);

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;