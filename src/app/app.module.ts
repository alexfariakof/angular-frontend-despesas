import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SuccessAlertComponent } from './shared/components/success-alert/success-alert.component';
import { WarningAlertComponent }  from './shared/components/warning-alert/warning-alert.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ReceitasComponent } from './pages/receitas/receitas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DespesasComponent } from './pages/despesas/despesas.component';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SuccessAlertComponent,
    WarningAlertComponent,
    CategoriasComponent,
    ReceitasComponent,
    DashboardComponent,
    DespesasComponent,
    LancamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
