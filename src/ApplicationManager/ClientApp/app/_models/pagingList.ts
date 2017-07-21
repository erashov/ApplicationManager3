import { Application } from "./index";

export class PagingList {
   
    records: Application[];
    count: number;
    constructor(count:number, records:Application[]){
        this.count=count;  
        this.records=records;
    }
}