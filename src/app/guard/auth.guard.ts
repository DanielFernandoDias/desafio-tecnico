import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usernameCookies = this.cookieService.get('username');
    const usernameStorage = localStorage.getItem('username');

    if (!usernameCookies && !usernameStorage) {
      this.authService.setAuthenticated(false);

      this.router.navigate(['/login']);
      return false;
    }

    if (usernameCookies) {
      this.authService.setAuthenticated(true);
    }
    return true;
  }

}
