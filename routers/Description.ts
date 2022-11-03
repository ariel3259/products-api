import { Express } from "express";
import DescriptionController from "../controllers/Description";

export default class DescriptionRouters {
    private router: Express
    private descriptionController: DescriptionController

    constructor(router: Express) {
        this.router = router
        this.descriptionController = new DescriptionController()

    }

    startRouting(){
        this.router.get('/api/descriptions', this.descriptionController.getAll)
        this.router.post('/api/descriptions', this.descriptionController.save)
        this.router.put('/api/descriptions/:id', this.descriptionController.update)
        this.router.delete('/api/descriptions/:id', this.descriptionController.delete)
    }
}