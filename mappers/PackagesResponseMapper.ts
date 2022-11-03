import Packages from "../models/Packages";
import PackagesResponse from "../types/Dto/PackagesResponse";

export default class PackagesResponseMapper {
    static toResponse(pkg: Packages): PackagesResponse {
        return {
            id: pkg.id,
            name: pkg.name,
            code: pkg.code,
            typeId: pkg.type_Id
        }
    }

    static toResponseArray(packages: Packages[]): PackagesResponse[] {
        const packagesResponse: PackagesResponse[] = [];
        packages.forEach((pkg: Packages) => packagesResponse.push(this.toResponse(pkg)));
        return packagesResponse;
    }
}