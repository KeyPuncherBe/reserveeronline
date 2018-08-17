import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (BACKEND_URL) {
            req = req.clone({ url: `${BACKEND_URL}${req.url}` });
            // console.log('set to ', `${BACKEND_URL}${req.url}`);
        }
        return next.handle(req);
    }
}

