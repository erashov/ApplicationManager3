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
  templateUrl: 'applications.component.html', providers: [ApplicationService]
})
export class ApplicationsComponent implements OnInit {
  displayedColumns = ['applicationId', 'address', 'districtName', 'statusName'];
  dataChange: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>([]);
  dataSource: ExampleDataSource | null;
  public count: number;
  public _paginator: Paginator;


  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private appserv: ApplicationService) {

    //this.count=this.loadData(this.paginator.pageIndex, this.paginator.pageSize).count;

    // console.log(this.dataSource);
  }

  ngOnInit() {
    //var c = this.getData();
    this._paginator = new Paginator(this.appserv, this.paginator.pageIndex, 10)

    //  th
    this.dataChange.next(this._paginator.applications);
    this.dataSource = new ExampleDataSource(this.dataChange, this.paginator, this._paginator,this.appserv);
    console.log(this.count);

  }

  /*   getData(pageIndex: number, pageSize: number) {
  
      return this.appserv.getListPage(pageIndex + 1, pageSize)
        .subscribe((data) => {
          this.count = data.count,
            this.dataChange.next(data.records)
          data.records.forEach(element => {
            this.applications.push(element);
            // this.dataChange.next(element)
          }
          );
        },
        err => {
          console.log(err);
        });
  
    } */
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
    
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Application[]> {
    const displayDataChanges = [
      this.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.pagin.applications.slice();
      this.pagin = new Paginator(this.appserv, this._paginator.pageIndex, this._paginator.pageSize)
      // Grab the page's slice of data.
      //const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return this.pagin.applications;
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
          }

          ); console.log(this.applications);
        console.log(this.count);
      },
      err => {
        console.log(err);
      });

  }
}
