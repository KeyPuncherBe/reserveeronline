import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../user/authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepting');
        if (this.authService.token && this.authService.token.length) {
            const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.authService.token}`)
            });
            console.log(clonedRequest);
            return next.handle(clonedRequest);
        }
        return next.handle(req);
    }
}
