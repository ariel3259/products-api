import cors from "cors"
import {json, Express} from "express"

export default class Middlewares {
    private routers: Express;

    constructor(routers: Express){
        this.routers = routers
    }

    startMiddlewares(): void {
        this.routers.use(cors());
        this.routers.use(json())
    }
}