import { Component, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from "../_services/application.service"
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { Application } from "../_models/index";
import { PagingList } from "../_models/pagingList";
import { Subscriber } from "rxjs/Subscriber";

@Component({
  selector: 'applications',
  templateUrl: 'applications.component.html', styleUrls:["./applications.component.scss"], providers: [ApplicationService]
})
export class ApplicationsComponent implements OnInit {
  displayedColumns = ['applicationId', 'address', 'districtName', 'statusName'];
  dataChange: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>([]);
  dataSource: ExampleDataSource | null;
  public count: number=0;
  public _paginator: Paginator;


  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private appserv: ApplicationService) {

  }

  ngOnInit() {
    console.log(1);
   this._paginator = new Paginator(this.appserv, this.paginator.pageIndex, 10);

    this.dataSource = new ExampleDataSource(this.dataChange, this.paginator, this._paginator, this.appserv);

    console.log(this.dataSource);

  }


}

export class ExampleDataSource extends DataSource<any> {
  /*   // dataChange: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>([]);
    // applications: Application[];
    constructor(private dataChange: BehaviorSubject<Application[]>, private _paginator: MdPaginator) {
      super();
      // this.dataChange.next(applications);
    }
  
    connect(): Observable<Application[]> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(this.dataChange);
        observer.complete();
      });//Observable.of(this.records);
    }
    disconnect() { } */
  constructor(private dataChange: BehaviorSubject<Application[]>, private _paginator: MdPaginator, private pagin: Paginator, private appserv: ApplicationService) {

    super();
 //this.pagin = new Paginator(this.appserv, this._paginator.pageIndex, this._paginator.pageSize);
  }


  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Application[]> {
           console.log(1.1);
  // this.pagin = new Paginator(this.appserv, this._paginator.pageIndex, 10)
    //console.log(this._paginator.applications);

    this.dataChange.next(this.pagin.applications);

    const displayDataChanges = [
        
      //this.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      console.log(2);
            this.pagin = new Paginator(this.appserv, this._paginator.pageIndex, this._paginator.pageSize)
      const data = this.pagin.applications;

      return data;
    });
  }

  disconnect() { }

}
export class Paginator {
  public count: number;
  public applications: Application[] = [];
  constructor(private appserv: ApplicationService, pageIndex: number, pageSize: number) {
    this.getData(pageIndex, pageSize);
  }

  private getData(pageIndex: number, pageSize: number) {

    return this.appserv.getListPage(pageIndex + 1, pageSize)
      .subscribe((data) => {
        this.count = data.count,
          data.records.forEach(element => {
            this.applications.push(element);
          });
        console.log(3);
      },
      err => {
        console.log(err);
      });

  }
}
