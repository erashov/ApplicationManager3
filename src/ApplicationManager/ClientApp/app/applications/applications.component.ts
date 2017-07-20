import { Component, OnInit, Inject } from '@angular/core';
import { Application } from "../_models/index";
import { Http } from "@angular/http";
import { PagingList } from "../_models/pagingList";

@Component({
    selector: 'applications',
    templateUrl: 'applications.component.html'
})

export class ApplicationsComponent implements OnInit {

    public applications: Application[];
    public page=1;
    public list: PagingList;

    constructor(http: Http, @Inject('ORIGIN_URL') originUrl: string) {

        
        
        http.get(originUrl + '/api/Application/getpage?page='+this.page+'&count=30').subscribe(result => {
            this.list = result.json() as PagingList;
        });
        
   //  console.log(this.applications);
     
    }

    ngOnInit() { }
}