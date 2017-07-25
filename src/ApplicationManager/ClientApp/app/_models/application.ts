import { district } from "./district";
import { applicationStatus } from "./applicationStatus";

export interface Application {
    applicationId: number;
    address: string;
    districtId: number;
    applicationStatusId: number;
    district: district;
    applicationStatus: applicationStatus;
 /*    constructor(applicationId: number, address: string, districtId: number, applicationStatusId: number, district: district, applicationStatus: applicationStatus) {
        this.applicationId = applicationId;
        this.address = address;
        this.applicationStatus = applicationStatus;
        this.districtId = districtId;
        this.district = district;
    } */
}