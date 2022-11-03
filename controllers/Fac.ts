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
            res: Response<FacResponse | {message: string}>)
        : Promise<void> {
        const fac: Fac = req.body;
        const facService: FacService = new FacService();
        try{
            const facSaved: Fac = await facService.save(fac);
            const facResponse: FacResponse = FacResponseMapper.toResponse(facSaved);
            res.status(201).json(facResponse);
        }catch(err) {
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }

    async update(
            req: Request<{id: number}, FacResponse | {message: string}, Fac, {}>,
            res: Response<FacResponse | {message: string}>
    ) : Promise<void> {
        const facService: FacService = new FacService();
        const {id}: {id: number} = req.params
        const fac: Fac = req.body;
        fac.id = id
        try{
            const facModified: Fac = await facService.update(fac);
            if(!facModified){
                res.status(400).json({
                    id: 0,
                    answer: '',
                    question: '',
                    typeId: 0
                });
                return;
            }
            const facResponse: FacResponse = FacResponseMapper.toResponse(facModified);
            res.json(facResponse);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'})
        }
    }

    async delete(
        req: Request<{id: number}, null | {message: string}>,
        res: Response<null | {message: string}>
    ): Promise<void> {
        const facService: FacService = new FacService();
        const {id}: {id: number} = req.params;
        try{
            await facService.delete(id)
            res.status(204).json(null);
        }catch(err) {
            console.log(err);
            res.status(502).json({message: 'server error'})
        }
    } 
}