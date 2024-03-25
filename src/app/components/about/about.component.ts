import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(private cookieService: CookieService, private router: Router, private authService: AuthService) {
    this.getState();
    this.getCookies();
    this.verifyAuth();
  }
  verifyAuth() {
    if (this.username) {
      this.authService.setAuthenticated(true);
    } else {
      this.router.navigate(['/login']);
    }
  }

  public username: string = '';

  private getState() {
    const state = this.router?.getCurrentNavigation()?.extras.state;
    if (state && state['data']) {
      this.username = state['data'].key;
    }
  }


  private getCookies() {
    const cookieUsername = this.cookieService.get('username');
    if (cookieUsername) {
      this.username = cookieUsername;
    }
  }
}
