import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from './shared/services/menu-service/menu.service';
import { PrimeiroAcessoComponent } from './pages/primeiro-acesso/primeiro-acesso.component';
import { AlertModule } from './shared/components/alert-component/alert.component.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrimeiroAcessoComponent
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
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
