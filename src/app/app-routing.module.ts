import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { RegisterPartnerComponent } from './components/register-partner/register-partner.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { ListPartnersComponent } from './components/list-partners/list-partners.component';
import { ListCompanyComponent } from './components/list-company/list-company.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sobre', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/parceiro', component: RegisterPartnerComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/empresa-externa', component: RegisterCompanyComponent, canActivate: [AuthGuard] },
  { path: 'listar/parceiros', component: ListPartnersComponent, canActivate: [AuthGuard] },
  { path: 'listar/empresa-externa', component: ListCompanyComponent, canActivate: [AuthGuard] },
  { path: 'listar/empresa-externa/:page', component: ListCompanyComponent, canActivate: [AuthGuard] }, // Rota com parâmetro de página
  { path: '', redirectTo: '/sobre', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
