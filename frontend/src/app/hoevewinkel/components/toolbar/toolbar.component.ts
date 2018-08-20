import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationInterceptor } from '../../../http-interceptors/authentication-interceptor';
import { AuthenticationService } from '../../../user/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public loggedIn = false;

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authenticationService: AuthenticationService, private router: Router ) { }

  ngOnInit() {
    this.authenticationService.user$.subscribe( data => {
      if (data) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  public isAdmin(): boolean {
    return this.authenticationService.userRole$ && this.authenticationService.userRole$.getValue().toLowerCase() === 'admin';
  }

  public logout(): void {
    this.authenticationService.logout();
  }

}
