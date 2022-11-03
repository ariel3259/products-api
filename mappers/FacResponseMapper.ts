import Fac from "../models/Fac";
import FacResponse from "../types/Dto/FacResponse";

export default class FacResponseMapper {
    static toResponse(fac: Fac): FacResponse {
        return {
            id: fac.id,
            question: fac.question,
            answer: fac.answer,
            typeId: fac.typeId
        }
    }

    static toResponseArray(facs: Fac[]): FacResponse[] {
        const facsResponse: FacResponse[] = [];
        facs.forEach((fac: Fac) => facsResponse.push(this.toResponse(fac)));
        return facsResponse; 
    }
}