import dotenv from "dotenv"
dotenv.config();
import morgan from "morgan";
import { Express } from "express";
import express from 'express'
import sequelize from "./configs/dbCon"
import Routers from "./routers";
import Middlewares from "./middlewares";

morgan(':method :url :status - :response-time ms')
const app: Express = express()
const port: string | undefined = process.env.PORT

//Start middlewares
const middlewares: Middlewares = new Middlewares(app);
middlewares.startMiddlewares();

//Starting routers
const routers: Routers = new Routers(app);
routers.startRouters();


app.listen(port, async () => {
    console.log(`Server online on http://localhost:${process.env.PORT}`)
    try{
        await sequelize.sync();
        console.log('Connected to database')
    }catch(err){
        console.log('Something is wrong...')
        console.log(err);
    }
})
