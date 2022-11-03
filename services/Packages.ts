import Page from "../types/Page";
import Packages from "../models/Packages";

export default class PackagesService {
    async getAll(offset: number, limit: number): Promise<Page<Packages>> {
        const packages: Packages[] = await Packages.findAll({
            offset,
            limit,
            where: {
                state: true
            }
        });
        const totalItems: number = await Packages.count({
            where: {
                state: true
            }
        });
        return {
            elements: packages,
            totalItems 
        }
    }

    async save(pkg: Packages): Promise<Packages | null> {
        try{
            const packageSaved: Packages = await Packages.create(pkg);
            return packageSaved;
        }catch(err){
            return null
        }
    }

    async update(pkg: Packages): Promise<Packages> {
        await Packages.update(pkg, {
            where: {
                id: pkg.id,
                state: true
            }
        });
        const packageModified: Packages = await Packages.findOne({
            where: {
                id: pkg.id,
                state: true
            }
        }) as Packages;
        return packageModified;
    }

    async delete(id: number): Promise<void> {
        await Packages.update({
            state: false
        }, {
            where: {
                id,
                state: true
            }
        });
    }
}