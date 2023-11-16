import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from './shared/services/menu-service/menu.service';
import { PrimeiroAcessoComponent } from './pages/primeiro-acesso/primeiro-acesso.component';
import { CategoriasFormComponent } from './pages/categorias/categorias-form/categorias.form.component';
import { AlertComponent } from './shared/components/alert-component/alert.component';
import { ModalFormComponent } from './shared/components/modal-form/modal.form.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from './shared/components/alert-component/alert.component.module';
import { ControleAcessoService } from './shared/services/controle-acesso/controle-acesso.service';
import { AuthService } from './shared/services/Auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrimeiroAcessoComponent,
    CategoriasFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AlertModule
  ],
  providers: [AuthService, ControleAcessoService, MenuService, AlertComponent, ModalFormComponent, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
