import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor( private tokenStorage: TokenStorageService, private route: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            //console.log("err.status"+err.status)
            if (err.status === 401) {
                this.tokenStorage.signOut();
                this.route.navigate(["/login"]);
            }
            
            //const error = err.error.message || err.statusText;
            const error=err
            //console.log("yyy" + JSON.stringify(error))
            
            return throwError(error);
        }))
    }
}

export const errorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ];