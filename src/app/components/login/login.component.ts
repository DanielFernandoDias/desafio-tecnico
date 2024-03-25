import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
    manterConectado: [true]
  });

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.cleanDataStorage();
  }

  private cleanDataStorage() {
    this.authService.setAuthenticated(false);
    this.cookieService.deleteAll();
    localStorage.removeItem('username');
  }

  public logar(): void {
    if (this.formLogin && this.formLogin.valid) {

      const email = this.formLogin?.get('email')?.value;
      const manterConectado = this.formLogin?.get('manterConectado')?.value;

      if (manterConectado) {
        this.cookieService.set('username', email);
      } else {
        localStorage.setItem('username', email);
      }

      this.authService.setAuthenticated(true);

      const data = { key: email };
      this.router.navigate(['/sobre'], { state: { data } });
    }
  }
}
