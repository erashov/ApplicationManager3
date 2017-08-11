﻿import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/index";
import { LoginComponent } from "./login/index";
import { RegisterComponent } from "./register/index";
import { AuthGuard } from "./_guards/index";
import { UserComponent } from './user/user.componet';
const appRoutes: Routes = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "user", component: UserComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    // otherwise redirect to home
    { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);