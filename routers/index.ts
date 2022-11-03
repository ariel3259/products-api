import DescriptionRouters from "./Description";
import FacRouters from "./Fac";
import { Express } from "express";

export default class Routers {
    private descriptionRouters: DescriptionRouters
    private facRouters: FacRouters

    constructor(router: Express){
        this.descriptionRouters = new DescriptionRouters(router);
        this.facRouters = new FacRouters(router);
    }

    startRouters(){
        this.descriptionRouters.startRouting();
        this.facRouters.startRouting();
    }
}