import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

import { AlertComponent } from "./_directives/index";
import { AuthGuard } from "./_guards/index";
import { AlertService, AuthenticationService, UserService } from "./_services/index";

import { HomeComponent } from "./home/index";

import { LoginComponent } from "./login/index";
import { RegisterComponent } from "./register/index";
//import {NavBarComponent} from './nav-bar/nav-bar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationEditComponent } from "./applications/edit/application.edit.component";
import { MaterialModule, MdInputModule, MdButtonModule, MdCardModule, MdTableModule,MdPaginatorModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import 'hammerjs';

export const sharedConfig: NgModule = {
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ApplicationsComponent,
        HeaderComponent,
        SidebarComponent,
    ],
    
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,
        MdInputModule,
        MdButtonModule,
        MdTableModule,MdPaginatorModule,
        CdkTableModule,        
        routing
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ]

};
