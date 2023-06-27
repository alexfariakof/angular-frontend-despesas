import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    NgModule,
    NgbModule,
    FormsModule,
    LoginRoutingModule, 
    LoginComponent
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
