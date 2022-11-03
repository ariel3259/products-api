import Description from "../models/Descriptions";
import Page from "../types/Page";

export default class DescriptionService {
    async getAll(offset: number, limit: number): Promise<Page<Description>> {
        const descriptions: Description[] = await Description.findAll({
            limit,
            offset,
            where: {
                state: true
            }
        });
        const totalItems: number = await Description.count({
            where: {
                state: true
            }
        })
        return {
            elements: descriptions,
            totalItems 
        }
    }

    async save(description: Description): Promise<Description> {
        return await Description.create(description);
    }

    async update(description: Description): Promise<Description> {
        await Description.update(description, {
            where: {
                id: description.id,
                state: true
            }
        });
        const descriptionModified: Description | null = await Description.findOne({
            where: {
                id: description.id,
                state: true
            }
        });
        return descriptionModified as Description;
    }

    async delete(id: number): Promise<void> {
        console.log(id)
        await Description.update({
            state: false
        }, {
            where: {
                id,
                state: true
            }
        });
    }
}