import { Component, OnInit, Inject } from '@angular/core';
import { Application, PagingList } from "../_models/index";
import { ApplicationService } from "../_services/application.service"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
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
        console.log("111");
        
        const modalRef = this.modalService.open(ApplicationEditComponent);
        modalRef.componentInstance.name = 'World';
    }
    constructor(private appserv: ApplicationService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.loadPage(this.page);
    }
}