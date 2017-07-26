import { Application } from "./index";

export class PagingList {
   
   public records: Application[];
   public count: number;
    constructor(count:number, records:Application[]){
      // console.log(records);
        
        this.count=count;  
        this.records=records;
       // console.log(this.records.length);
        
    }
}