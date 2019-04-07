import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from './Apiconstant';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class InternalInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = ApiConstants.apiHostName;
        req = req.clone({
        url: url + req.url
        });
        if(!req.url.includes("login") && !req.url.includes("register")) {
            return next.handle(this.addBasicAndAuthHeaders(req));
        }
        return next.handle(this.addBasicHeaders(req));
    }

    private addBasicAndAuthHeaders(req: HttpRequest<any>) {
        req = this.addBasicHeaders(req);
        const authToken = this.authService.getAuthorizationToken();
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        return authReq;
    }

    private addBasicHeaders(req: HttpRequest<any>) {
        const authReq = req.clone({
            headers: req.headers.set('Content-Type', 'application/json')
            // .set('Access-Control-Allow-Origin', '*')
            // .set('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, HEAD, OPTIONS")
            // .set('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept")
        });
        return authReq;
    }
}