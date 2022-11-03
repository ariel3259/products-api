import FacService from "../services/Fac";
import { Request, Response } from "express";
import Fac from "../models/Fac";
import FacResponse from "../types/Dto/FacResponse";
import FacResponseMapper from "../mappers/FacResponseMapper";
import Page from "../types/Page";
import Pagination from "../types/Pagination";

export default class FacController {
    
    async getAll(
            req: Request<{}, FacResponse[] | {message: string}, {}, Pagination>, 
            res: Response<FacResponse[] | {message: string}>)
        : Promise<void> {
        const {offset, limit}: Pagination = req.query
        const facService: FacService = new FacService();
        try{
            const facsPaginated: Page<Fac> = await facService.getAll(parseInt(offset), parseInt(limit))
            const facsResponse: FacResponse[] = FacResponseMapper.toResponseArray(facsPaginated.elements);
            res.set({
                'x-total-count': facsPaginated.totalItems
            });
            res.json(facsResponse);
        }catch(err){
            console.log(err);
            res.status(502).send({message: 'sever error'})
        }
    }

    async save(
            req: Request<{}, FacResponse | {message: string}, Fac, {}>,
            res:Response<FacResponse | {message: string}>)
        : Promise<void> {
        const fac: Fac = req.body;

    }
}