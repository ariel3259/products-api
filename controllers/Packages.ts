import PackagesService from "../services/Packages";
import Packages from "../models/Packages";
import PackagesResponse from "../types/Dto/PackagesResponse";
import PackagesResponseMapper from "../mappers/PackagesResponseMapper";
import Page from "../types/Page";
import Pagination from "../types/Pagination";
import { Request, Response } from "express";

export default class PackagesController {
    async getAll(
            req: Request<{}, PackagesResponse[] | {message: string}, {}, Pagination>,
            res: Response<PackagesResponse[] | {message: string}>)
        : Promise<void> {
            const packagesService = new PackagesService();
            const {offset, limit}: Pagination = req.query;
            try{
                const packagesPaginated: Page<Packages> = await packagesService.getAll(parseInt(offset), parseInt(limit));
                const packagesResponse: PackagesResponse[] = PackagesResponseMapper.toResponseArray(packagesPaginated.elements);
                res.set({
                    'x-total-count': packagesPaginated.totalItems
                });
                res.json(packagesResponse);
            }catch(err){
                console.log(err);
                res.status(502).json({message: 'server error'});  
            }
    }

    async save(
            req: Request<{}, PackagesResponse | {message: string}, Packages, {}>,
            res: Response<PackagesResponse | {message: string}>)
        : Promise<void> {
        const packagesService: PackagesService = new PackagesService();
        const pkg: Packages = req.body;
        try{
            const pkgSaved: Packages = await packagesService.save(pkg) as Packages;
            if(!pkgSaved) {
                res.status(400).json({
                    id: 0,
                    name: '',
                    code: 0,
                    typeId: 0
                })
                return;
            }
            const pkgResponse: PackagesResponse = PackagesResponseMapper.toResponse(pkgSaved);
            res.status(201).json(pkgResponse);
        }catch(err) {
             console.log(err);
             res.status(502).json({message: 'server error'})
        }
    }

    async update(
            req: Request<{id: number}, PackagesResponse | {message: string}, Packages, {}>,
            res: Response<PackagesResponse | {message: string}>)
        : Promise<void> {
            const packagesService: PackagesService = new PackagesService();
            const {id}: {id: number} = req.params;
            const pkg: Packages = req.body;
            pkg.id = id;
            try{
                const pkgSaved: Packages = await packagesService.update(pkg);
                if(!pkgSaved) {
                    res.status(400).json({
                        id: 0,
                        name: '',
                        code: 0,
                        typeId: 0
                    });
                    return;
                }
                const pkgResponse: PackagesResponse = PackagesResponseMapper.toResponse(pkgSaved);
                res.json(pkgResponse);
            }catch(err){
                console.log(err);
                res.status(502).json({message: 'server error'});
            }
    }

    async delete(
        req: Request<{id: number}, null | {message: string}>,
        res: Response<null | {message: string}>
    )
    : Promise<void> {
        const packagesService: PackagesService = new PackagesService();
        const {id}: {id: number} = req.params;
        try{
            await packagesService.delete(id)
            res.status(204).json(null);
        }catch(err){
            console.log(err);
            res.status(502).json({message: 'server error'});
        }
    }
}