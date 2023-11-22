import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MenuService } from './shared/services/utils/menu-service/menu.service';
import { PrimeiroAcessoComponent } from './pages/primeiro-acesso/primeiro-acesso.component';
import { AlertComponent } from './shared/components/alert-component/alert.component';
import { ModalFormComponent } from './shared/components/modal-form/modal.form.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from './shared/components/alert-component/alert.component.module';
import { ControleAcessoService } from './shared/services/api/controle-acesso/controle-acesso.service';
import { AuthService } from './shared/services/auth/auth.service';
import { CustomInterceptor } from './shared/services/interceptors/http.interceptor.service';
import { ModalConfirmComponent } from './shared/components/modal-confirm/modal.confirm.component';

@NgModule({
  declarations: [ AppComponent, LoginComponent, PrimeiroAcessoComponent ],
  imports: [ BrowserModule, AppRoutingModule, CommonModule, ReactiveFormsModule, HttpClientModule, AlertModule ],
  providers: [AuthService, ControleAcessoService, MenuService, AlertComponent, ModalFormComponent, ModalConfirmComponent, NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
