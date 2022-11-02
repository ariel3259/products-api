import dotenv from "dotenv"
dotenv.config();
import { Express } from "express";
import express from 'express'
import sequelize from "./configs/dbCon"



const app: Express = express()
const port: string | undefined = process.env.PORT
app.listen(port, async () => {
    console.log(`Server online on ${process.env.PORT}`)
    try{
        await sequelize.sync();
        console.log('Connected to database')
    }catch(err){
        console.log('Something is wrong...')
        console.log(err);
    }
})
