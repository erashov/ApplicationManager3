import { district } from "./district";
import { applicationStatus } from "./applicationStatus";

export class Application {
    applicationId: number;
    address: string;
    districtId: number;
    applicationStatusId: number;
    district: district;
    applicationStatus: applicationStatus;
}