import PackagesController from "../controllers/Packages";
import { Express } from "express";

export default class PackagesRouters {
    private router: Express;
    private controller: PackagesController;
    
    constructor(router: Express) {
        this.router = router;
        this.controller = new PackagesController();
    }

    startRouting(){
        this.router.get('/api/packages', this.controller.getAll);
        this.router.post('/api/packages', this.controller.save);
        this.router.put('/api/packages/:id', this.controller.update);
        this.router.delete('/api/packages/:id', this.controller.delete);
    }
}