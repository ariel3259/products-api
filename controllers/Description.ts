import DescriptionService from "../services/Description";
import {Request, Response} from "express"
import Pagination from "../types/Pagination";
import Page from "../types/Page";
import Description from "../models/Descriptions";
import DescriptionResponse from "../types/Dto/DescriptionResponse";
import DescriptionResponseMapper from "../mappers/DescriptionResponseMapper";

export default class DescriptionController {
    private descriptionService: DescriptionService;

    constructor(){
        this.descriptionService = new DescriptionService();
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const {offset, limit}: Pagination = req.query as unknown as Pagination;
        const paginatedDescriptions: Page<Description> = await this.descriptionService.getAll(offset, limit);
        const descriptionsResponse: DescriptionResponse[] = DescriptionResponseMapper.toResponseArray(paginatedDescriptions.elements);
        res.setHeader('x-total-count', paginatedDescriptions.totalItems);
        res.json(descriptionsResponse);
    }

    async save(req: Request, res: Response): Promise<void> {
        const descriptionToSave: Description = req.body as unknown as Description
        const descriptionSaved: Description = await this.descriptionService.save(descriptionToSave);
        const descriptionResponse: DescriptionResponse = DescriptionResponseMapper.toResponse(descriptionSaved);
        res.status(201).json(descriptionResponse);
    }

    async update(req: Request, res: Response): Promise<void> {
        const {id}: {id: number} = req.params as unknown as {id: number}
        const descriptionToModify: Description = req.body as unknown as Description;
        descriptionToModify.id = id;
        const descriptionModified: Description = await this.descriptionService.update(descriptionToModify);
        const descriptionResponse: DescriptionResponse = DescriptionResponseMapper.toResponse(descriptionModified);
        res.status(200).json(descriptionResponse);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const {id}: {id: number} = req.params as unknown as {id: number}
        await this.descriptionService.delete(id);
        res.status(204);
    }
}