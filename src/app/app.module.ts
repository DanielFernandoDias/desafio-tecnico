import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';



import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { RegisterPartnerComponent } from './components/register-partner/register-partner.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { ListPartnersComponent } from './components/list-partners/list-partners.component';
import { EditModalComponent } from './components/modal/edit-modal/edit-modal.component';
import { ConfirmModalComponent } from './components/modal/confirm-modal/confirm-modal.component';
import { ListCompanyComponent } from './components/list-company/list-company.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    RegisterPartnerComponent,
    RegisterCompanyComponent,
    LoadingComponent,
    ListPartnersComponent,
    EditModalComponent,
    ConfirmModalComponent,
    ListCompanyComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
