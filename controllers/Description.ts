import DescriptionService from "../services/Description";
import {Request, Response} from "express"
import Pagination from "../types/Pagination";
import Page from "../types/Page";
import Description from "../models/Descriptions";
import DescriptionResponse from "../types/Dto/DescriptionResponse";
import DescriptionResponseMapper from "../mappers/DescriptionResponseMapper";

export default class DescriptionController {
    constructor(){
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const descriptionService: DescriptionService = new DescriptionService();
        try{
            const {offset, limit}: Pagination = req.query as unknown as Pagination;
            const paginatedDescriptions: Page<Description> = await descriptionService.getAll(parseInt(offset + ''), parseInt(limit + ''));
            const descriptionsResponse: DescriptionResponse[] = DescriptionResponseMapper.toResponseArray(paginatedDescriptions.elements);
            res.setHeader('x-total-count', paginatedDescriptions.totalItems);
            res.json(descriptionsResponse);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }

    async save(req: Request, res: Response): Promise<void> {
        const descriptionService: DescriptionService = new DescriptionService();
        try{
            const descriptionToSave: Description = req.body
            
            const descriptionSaved: Description = await descriptionService.save(descriptionToSave);
            console.log(descriptionToSave);
            const descriptionResponse: DescriptionResponse = DescriptionResponseMapper.toResponse(descriptionSaved);
            res.status(201).json(descriptionResponse);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const descriptionService: DescriptionService = new DescriptionService();
        try{
            const {id}: {id: number} = req.params as unknown as {id: number}
            const descriptionToModify: Description = req.body as unknown as Description;
            descriptionToModify.id = id;
            const descriptionModified: Description = await descriptionService.update(descriptionToModify);

            const descriptionResponse: DescriptionResponse = DescriptionResponseMapper.toResponse(descriptionModified);
            res.status(200).json(descriptionResponse);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const descriptionService: DescriptionService = new DescriptionService();
        try{
            const {id}: {id: number} = req.params as unknown as {id: number}
            await descriptionService.delete(parseInt(id + ''));
            res.status(204).json(null);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }
}