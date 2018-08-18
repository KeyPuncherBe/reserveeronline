import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationInterceptor } from '../../../http-interceptors/authentication-interceptor';
import { AuthenticationService } from '../../../user/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public isAdmin(): boolean {
    return this.authenticationService.userRole$ && this.authenticationService.userRole$.getValue().toLowerCase() === 'admin';
  }

  public logout(): void {
    //implement code to logout;
  }

}
