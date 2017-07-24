import { Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {
    public url: string;
    // public localStorage : any;
    constructor(private http: Http, @Inject("ORIGIN_URL") originUrl: string) {
        this.url = originUrl;
    }

    // tslint:disable-next-line:typedef
    login(username: string, password: string) {
        // tslint:disable-next-line:typedef
        let headers = new Headers({ "Content-Type": "application/json" });
        // tslint:disable-next-line:typedef
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + "/api/Account/token", JSON.stringify({ username: username, password: password }), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                // tslint:disable-next-line:typedef
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    if (typeof window !== "undefined") {
                        localStorage.setItem("currentUser", JSON.stringify(user));

                    }
                }
            });
    }

    // tslint:disable-next-line:typedef
    logout() {
        // remove user from local storage to log user out
      if (typeof window !== "undefined") {
        localStorage.removeItem("currentUser");
       }
    }
}