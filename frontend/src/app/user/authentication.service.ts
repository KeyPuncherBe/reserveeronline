import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;
  private _userRole$: BehaviorSubject<string>;

  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    let parsedToken = this.parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.username);
    this._userRole$ = new BehaviorSubject<string>(parsedToken && parsedToken.role);
  }

  public get token(): string {
    return localStorage.getItem(this._tokenKey);
  }

  public get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  public get userRole$(): BehaviorSubject<string> {
    return this._userRole$;
  }

  private parseJwt(token) {
    if (!token) {
      return null;
    }
    const base64Token = token.split('.')[1];
    const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`/API/users/login`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(username);
          this._userRole$.next(this.parseJwt(token).role);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post(`/API/users/register`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    console.log('calling logout in auth service');
    if (this._user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => {
        this._user$.next(null);
        this.router.navigate(['/users/login']);
      });
    }
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`/API/users/checkusername`, { username }).pipe(
      map((item: any) => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
