import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'applications',
  templateUrl: 'applications.component.html', providers: [ApplicationService]
})
export class ApplicationsComponent {
  displayedColumns = ['applicationId', 'address', 'districtName', 'statusName'];
  exampleDatabase: ExampleDatabase;
  dataSource: ExampleDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private appserv: ApplicationService) {
  }

  ngOnInit() {
    this.exampleDatabase = new ExampleDatabase(this.appserv, this.paginator);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.appserv);
  }
}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>([]);
  get data(): Application[] { return this.applications; }
  private applications: Application[];
  public count: number;

  private _appserv: ApplicationService;


  constructor(appserv: ApplicationService, private _paginator: MdPaginator) {
    this._appserv = appserv;
//setTimeout(() => {
   this.loadData(this._paginator.pageIndex, this._paginator.pageSize);
  //  }, 6000);

 
    console.log(this._paginator.pageSize);
    console.log(this.applications);
    
    
    //this.addUser();
  }

  /** Adds a new user to the database. */
  addUser() {


    this.dataChange.next(this.applications);
  }

  loadData(pageIndex: number, pageSize: number) {
   // console.log(pageIndex + ":" + pageSize);
   // let dataList: PagingList;

    this._appserv.getListPage(pageIndex + 1, pageSize)
      .subscribe((data) => {
        this.count = data.count,
          this.applications = data.records
      });

  }

}



export class ExampleDataSource extends DataSource<any> {

  private _appserv: ApplicationService;
  private applications: Application[];
  private count: number;

  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator, appserv: ApplicationService) {
    super();
    this._appserv = appserv;

  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Application[]> {


    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page

    ];



    return Observable.merge(...displayDataChanges).map(() => {
      let data = this._exampleDatabase.data;


      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;

      this.loadData(this._paginator.pageIndex, this._paginator.pageSize);
    // console.log(data.length);

      return this.applications;;
    });
  }
  loadData(pageIndex: number, pageSize: number) {

    this._appserv.getListPage(pageIndex + 1, pageSize)
      .subscribe((data) => {
        this.count = data.count,
          this.applications = data.records
      });

  }

  disconnect() { }

}

/* import { Component, OnInit, Inject } from '@angular/core';
import { Application, PagingList } from "../_models/index";
import { ApplicationService } from "../_services/application.service"
//import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApplicationEditComponent } from "./edit/application.edit.component";


@Component({
    selector: 'applications',
    templateUrl: 'applications.component.html',
    providers: [ApplicationService]
})

export class ApplicationsComponent implements OnInit {

    public applications: Application[];
    private page: number = 1;
    previousPage: any;
    private list: PagingList;
    private itemsPerPage: number = 10;
    count: number;


    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.loadData();
        }
    }

    loadData() {
        this.appserv.getListPage(this.page, this.itemsPerPage)
            .subscribe((data) => {
                this.count = data.count,
                    this.applications = data.records
            });

    }
    open() {

    }
    constructor(private appserv: ApplicationService) {
    }

    ngOnInit() {
        this.loadPage(this.page);
    }
} */