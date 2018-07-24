import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('inside roleguard service');
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const userRole = this.authService.userRole$.getValue();
    console.log(`user role: ${userRole}`);
    // decode the token to get its payload
    if (
      !this.authService.user$.getValue() || userRole !== expectedRole
    ) {
      console.log(state.url);
      console.log(this.authService.redirectUrl);
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
