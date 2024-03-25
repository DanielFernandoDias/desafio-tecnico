import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-register-partner',
  templateUrl: './register-partner.component.html',
  styleUrls: ['./register-partner.component.scss']
})
export class RegisterPartnerComponent {

  isUserAuthenticated: boolean = false;

  public formParceiro: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    git: ['', Validators.required],
    doc: ['', Validators.required],
    cliente: [''],
    projeto: ['']
  });

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private router: Router, private authService: AuthService, private partnerService: PartnerService, private _snackBar: MatSnackBar) { }

  clientes: number[] = [];
  projetos: string[] = [];

  adicionarItem(formControlName: string, lista: any[]) {
    const formControl = this.formParceiro.get(formControlName);
    if (formControl && formControl.valid) {
      const item = formControl.value;
      lista.push(item);
      formControl.reset();
    }
  }

  adicionarCliente() {
    this.adicionarItem('cliente', this.clientes);
  }

  adicionarProjeto() {
    this.adicionarItem('projeto', this.projetos);
  }

  public prepararObjeto(data: any) {
    const objetoParaEnviar = {
      "createdAt": new Date().toISOString(),
      "name": data.nome,
      "description": data.descricao,
      "repositoryGit": data.git,
      "urlDoc": data.doc,
      "clients": this.clientes,
      "projects": this.projetos,
    };

    return objetoParaEnviar;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

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


  public cadastrarParceiro() {

    if (this.formParceiro.valid) {
      const parceiroData = this.formParceiro.value;
      const objeto = this.prepararObjeto(parceiroData);

      console.log(objeto);


      this.partnerService.registerPartner(objeto).subscribe(
        response => {
          this.openSnackBar('Parceiro cadastrado com sucesso!', 'Ok');
          this.clientes = [];
          this.projetos = [];
          this.formParceiro.reset();
        },
        error => {
          console.error('Erro ao cadastrar parceiro:', error);
        }
      );
    }
  }
}
