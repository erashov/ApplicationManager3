import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { sharedConfig } from "./app.module.shared";
import { AuthGuard } from "./_guards/index";
import { AlertService, AuthenticationService, UserService } from "./_services/index";
@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    providers: [
        sharedConfig.providers,
        { provide: "ORIGIN_URL", useValue: location.origin }
    ]
})
export class AppModule {
}
