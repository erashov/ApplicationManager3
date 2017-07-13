import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";

import { AlertComponent } from "./_directives/index";

import { HomeComponent } from "./home/index";
import { LoginComponent } from "./login/index";
import { RegisterComponent } from "./register/index";

import { routing } from "./app.routing";
import { AuthGuard } from "./_guards/index";
import { AlertService, AuthenticationService, UserService } from "./_services/index";
export const sharedConfig: NgModule = {
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,

    ],
};
