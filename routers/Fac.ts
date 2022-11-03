import FacController from "../controllers/Fac";
import { Express } from "express";

export default class FacRouters {
    private routers: Express;
    private facController: FacController;

    constructor(routers: Express) {
        this.routers = routers;
        this.facController = new FacController();
    }

    startRouting() {
        this.routers.get('/api/fac', this.facController.getAll);
        this.routers.post('/api/fac', this.facController.save);
        this.routers.put('/api/fac/:id', this.facController.update);
        this.routers.delete('/api/fac/:id', this.facController.delete);
    }
}