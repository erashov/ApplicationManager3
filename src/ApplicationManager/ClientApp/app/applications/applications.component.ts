import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdPaginator, MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from "../_services/application.service";
import { Application } from "../_models/index";
import { PagingList } from "../_models/pagingList";
import { Subscriber } from "rxjs/Subscriber";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Component({
  selector: 'applications',
  templateUrl: 'applications.component.html', styleUrls: ["./applications.component.scss"],// providers: [ApplicationService]
})
export class ApplicationsComponent {
  displayedColumns = ['applicationId', 'address'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  constructor(http: Http, @Inject("ORIGIN_URL") originUrl: string) {
    this.exampleDatabase = new ExampleHttpDao(http, originUrl);
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase!,
      this.sort, this.paginator);
      console.log(this.dataSource);
      

  }
}
/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  url: string;
  count:number
  constructor(private http: Http, originUrl: string) {
    this.url = originUrl;
  }

  getRepoIssues(sort: string, order: string, page: number): Observable<Response> {
    const requestUrl =
      `${this.url}/api/Application/get?sort=${sort}&order=${order}&page=${page+1}&pageSize=10`;

    return this.http.get(requestUrl);
  }
}

export class ExampleDataSource extends DataSource<Application> {
  // The number of issues returned by github matching the query.
  resultsLength: number = 0;
  isLoadingResults: boolean;
  isRateLimitReached: boolean;

  constructor(private _exampleDatabase: ExampleHttpDao,
    private _sort: MdSort,
    private _paginator: MdPaginator) {
    super();
  }

  connect(): Observable<Application[]> {

    const displayDataChanges = [
      this._sort.mdSortChange,
      this._paginator.page,
    ];

    this._sort.mdSortChange.subscribe(() => {
      this._paginator.pageIndex = 0;
    })

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;

        return this._exampleDatabase.getRepoIssues(
          this._sort.active, this._sort.direction, this._paginator.pageIndex);
      })
      .catch(() => {
        this.isRateLimitReached = true;
        return Observable.of(null);
      })
      .map(result => {

        this.isLoadingResults = false;
        return result;
      })
      .map(result => {
        if (!result) { return []; }
        this.isRateLimitReached = false;
        this.resultsLength = result.json().total_count;

        return this.readGithubResult(result);
      });


  }

  disconnect() { }

  private readGithubResult(result: Response): Application[] {

    return result.json().items.map(app => {
     
      return {
        applicationId: app.applicationId,
        address: app.address,
     //   districtName: app.district.districtName,
        //statusName: app.applicationStatus.statusName
      };
    });
  }
}