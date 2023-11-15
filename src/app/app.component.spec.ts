import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { PrimeiroAcessoComponent } from './pages/primeiro-acesso/primeiro-acesso.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
          declarations: [AppComponent, LoginComponent, PrimeiroAcessoComponent],
          imports: [RouterTestingModule, BrowserModule, AppRoutingModule, CommonModule,  ReactiveFormsModule, HttpClientModule, FormsModule ],
        providers: []
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'despesas-frontend-angular'`, () => {
    expect(app.title).toEqual('despesas-frontend-angular');
  });

  it('should initialize isAuthenticated to false', () => {
    expect(app.isAuthenticated).toBe(false);
  });

  it('should set isAuthenticated to true when onLoginClicked is called', () => {
    app.onLoginClicked();
    expect(app.isAuthenticated).toBe(true);
  });

});
