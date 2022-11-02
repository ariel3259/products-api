import Description from "../models/Descriptions";
import DescriptionResponse from "../types/Dto/DescriptionResponse";

export default class DescriptionResponseMapper {
    static toResponse(description: Description): DescriptionResponse {
        return {
            id: description.id,
            standar: description.standar,
            premium: description.premium,
            university: description.university,
            integral: description.integral,
            idEnterprise: description.idEnterprise,
            name: description.name
        }
    }
    static toResponseArray(descriptions: Description[]): DescriptionResponse[]{
        const descriptionsResponse: DescriptionResponse[] = [];
        descriptions.forEach(description => descriptionsResponse.push(this.toResponse(description)));
        return descriptionsResponse;
    }
}