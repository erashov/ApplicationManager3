import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.addLangs(["en", "fr", "ur"]);
        translate.setDefaultLang("en");
        // tslint:disable-next-line:typedef
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr|ur/) ? browserLang : "en");
    }
}