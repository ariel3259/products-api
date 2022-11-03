import Fac from "../models/Fac";
import Page from "../types/Page";

export default class FacService {
    async getAll(offset: number, limit: number): Promise<Page<Fac>> {
        const facs: Fac[] = await Fac.findAll({
            offset, 
            limit,
            where: {
                state: true
            }
        });
        const totalItems = await Fac.count({
            where: {
                state: true
            }
        });
        return {
            elements: facs,
            totalItems
        }
    }

    async save(fac: Fac): Promise<Fac> {
        const facSaved: Fac = await Fac.create(fac)
        return facSaved;
    }

    async update(fac: Fac): Promise<Fac> {
        await Fac.update(fac, {
            where: {
                id: fac.id,
                state: true
            }
        });
        const facModified: Fac = await Fac.findOne({
            where: {
                id: fac.id,
                state: true
            }
        }) as Fac;
        return facModified;
    }

    async delete(id: number): Promise<void> {
        await Fac.update({
            state: false
        }, {
            where: {
                id,
                state: true
            }
        });
    }
}