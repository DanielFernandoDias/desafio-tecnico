import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent {

  isUserAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      setTimeout(() => {
        this.verifyAcess(isAuthenticated);
      });
    });
  }
  verifyAcess(isAuthenticated: boolean) {
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  public formParceiro: FormGroup = this.formBuilder.group({
    companyName: ['', Validators.required],
    collaboratorsCount: ['', Validators.required],
    isActive: [false],
  });

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private router: Router, private authService: AuthService, private companyService: CompanyService, private _snackBar: MatSnackBar) { }



  public prepararObjeto(data: any) {
    const objetoParaEnviar = {
      "createdAt": new Date().toISOString(),
      "companyName": data.companyName,
      "collaboratorsCount": data.collaboratorsCount,
      "lastSubmit": new Date().toISOString(),
      "isActive": data.isActive,
    };

    return objetoParaEnviar;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  public cadastrarCompany() {

    if (this.formParceiro.valid) {
      const companyData = this.formParceiro.value;
      const objeto = this.prepararObjeto(companyData);

      this.companyService.registerCompany(objeto).subscribe(
        response => {
          this.openSnackBar('Parceiro cadastrado com sucesso!', 'Ok');
          this.formParceiro.reset();
        },
        error => {
          console.error('Erro ao cadastrar parceiro:', error);
        }
      );
    }
  }
}
