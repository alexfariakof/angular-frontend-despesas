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
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MomentDateModule,  MAT_MOMENT_DATE_ADAPTER_OPTIONS,} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [ AppComponent, LoginComponent, PrimeiroAcessoComponent ],
  imports: [ BrowserModule, AppRoutingModule, CommonModule, MdbFormsModule, ReactiveFormsModule, HttpClientModule, AlertModule,
            MatFormFieldModule, MatInputModule, MatSelectModule , MatDatepickerModule, MatNativeDateModule,  BrowserAnimationsModule, MomentDateModule  ],
  providers: [AuthService, ControleAcessoService, MenuService, AlertComponent, ModalFormComponent,  ModalConfirmComponent, NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true, },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
