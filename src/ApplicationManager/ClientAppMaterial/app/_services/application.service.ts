import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { PagingList } from "../_models/pagingList";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Application } from "../_models/index";

@Injectable()
export class ApplicationService {
    public url: string;

    constructor(private http: Http, @Inject("ORIGIN_URL") originUrl: string) {
        this.url = originUrl;
    }
    getListPage(page: number,amount:number): Observable<PagingList> {
        return this.http.get(this.url+ '/api/Application/getpage?page='+page+ '&count='+amount)
            .map((response: Response) => response.json())
            .map(({ count, records }) => new PagingList(count, records));
    }


}
