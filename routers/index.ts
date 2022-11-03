import DescriptionRouters from "./Description";
import { Express } from "express";

export default class Routers {
    private descriptionRouters: DescriptionRouters
    
    constructor(router: Express){
        this.descriptionRouters = new DescriptionRouters(router);
    }

    startRouters(){
        this.descriptionRouters.startRouting();
    }
}