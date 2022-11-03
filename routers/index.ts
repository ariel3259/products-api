import DescriptionRouters from "./Description";
import FacRouters from "./Fac";
import { Express } from "express";
import PackagesRouters from "./Packages";

export default class Routers {
    private descriptionRouters: DescriptionRouters
    private facRouters: FacRouters
    private pkgRouters: PackagesRouters

    constructor(router: Express){
        this.descriptionRouters = new DescriptionRouters(router);
        this.facRouters = new FacRouters(router);
        this.pkgRouters = new PackagesRouters(router)
    }

    startRouters(){
        this.descriptionRouters.startRouting();
        this.facRouters.startRouting();
        this.pkgRouters.startRouting();
    }
}