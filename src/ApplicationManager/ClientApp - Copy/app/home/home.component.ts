import { Component, OnInit } from "@angular/core";

import { User } from "../_models/index";
import { UserService } from "../_services/index";

@Component({
    moduleId: module.id.toString(),
    templateUrl: "home.component.html"
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        if (typeof window !== "undefined") {
            this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        }

    }

    // tslint:disable-next-line:typedef
    ngOnInit() {
        // this.loadAllUsers();
    }

    // tslint:disable-next-line:typedef
    deleteUser(id: number) {
        // this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    // tslint:disable-next-line:typedef
    private loadAllUsers() {
        // this.userService.getAll().subscribe(users => { this.users = users; });
    }
}