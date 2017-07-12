import { Component } from "@angular/core";
import { AlertService} from "./_services/index";


@Component({
    moduleId: module.id.toString(),
    selector: "app",
    templateUrl: "app.component.html",
    providers:[AlertService]
})

export class AppComponent { }