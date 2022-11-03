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

    async getAll(
            req: Request<{}, DescriptionResponse[] | {message: string}, {}, Pagination>,
            res: Response<DescriptionResponse[] | {message: string}>)
        : Promise<void> {
        const descriptionService: DescriptionService = new DescriptionService();
        try{
            const {offset, limit}: Pagination = req.query;
            const paginatedDescriptions: Page<Description> = await descriptionService.getAll(parseInt(offset), parseInt(limit));
            const descriptionsResponse: DescriptionResponse[] = DescriptionResponseMapper.toResponseArray(paginatedDescriptions.elements);
            res.set({
                'x-total-count': paginatedDescriptions.totalItems
            });
            res.json(descriptionsResponse);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }

    async save(
            req: Request<{}, DescriptionResponse | {message: string}, Description, {}>, 
            res: Response<DescriptionResponse | {message: string}>)
        : Promise<void> {
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

    async update(
            req: Request<{id: number}, DescriptionResponse | {message: string}, Description, {}>,
            res: Response<DescriptionResponse | {message: string}>)
        : Promise<void> {
        const descriptionService: DescriptionService = new DescriptionService();
        try{
            const {id}: {id: number} = req.params;
            const descriptionToModify: Description = req.body;
            descriptionToModify.id = id;
            const descriptionModified: Description = await descriptionService.update(descriptionToModify);
            if(!descriptionModified) {
                res.status(400).json({
                    id: 0,
                    name: '',
                    university: '',
                    standar: '',
                    integral: '',
                    premium: '',
                    idEnterprise: 0
                });
                return;
            }
            const descriptionResponse: DescriptionResponse = DescriptionResponseMapper.toResponse(descriptionModified);
            res.status(200).json(descriptionResponse);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }

    async delete(
            req: Request<{id: number}, null | {message: string}, {}, {}>,
            res: Response<null | {message: string}>)
        : Promise<void> {
        const descriptionService: DescriptionService = new DescriptionService();
        try{
            const {id}: {id: number} = req.params; 
            await descriptionService.delete(id);
            res.status(204).json(null);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }
}