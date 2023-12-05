import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed, fakeAsync, flush } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertComponent, AlertType } from "src/app/shared/components";
import { MenuService } from "src/app/shared/services";
import { PerfilComponent } from "./perfil.component";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UsuarioService } from "src/app/shared/services/api";
import { from, of, throwError } from "rxjs";
import { IUsuario } from "src/app/shared/interfaces";
import { MockLocalStorage } from "__mock__";

describe('Unit Test PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let localStorageSpy: MockLocalStorage;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    localStorageSpy = new MockLocalStorage();
    TestBed.configureTestingModule({
      imports: [ CommonModule, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers: [MenuService, AlertComponent, NgbActiveModal, UsuarioService,
        { provide: Storage, useValue: localStorageSpy.instance() }
      ]
    });
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorageSpy.cleanup();
  });

  it('should create', () => {
    // Arrange
    localStorageSpy.setItem('idUsuario', 10);

    // Act
    component.ngOnInit();

    // Assert
    expect(component).toBeTruthy();
    expect(component.prefilFrom.value.id).toEqual(10);
  });

  it('should initialize and fill perilForm', fakeAsync(() => {
    // Arrange
    const mockUsuario: IUsuario = {
      id : 99,
      email: 'teste@teste.com',
      nome: 'Teste Usuário',
      sobreNome: 'Teste',
      telefone: '(21) 9999-9999'
    };
    localStorageSpy.setItem('idUsuario', mockUsuario.id);
    const spyOnGetUsuarioById = spyOn(usuarioService, 'getUsuarioById').and.returnValue(from(Promise.resolve(mockUsuario)));

    // Act
    component.initialize();
    flush();

    // Assert
    expect(spyOnGetUsuarioById).toHaveBeenCalled();
    expect(spyOnGetUsuarioById).toHaveBeenCalledWith(mockUsuario.id);
    expect(component.prefilFrom.value.id).toEqual(mockUsuario.id);
    expect(component.prefilFrom.value.email).toEqual(mockUsuario.email);
    expect(component.prefilFrom.value.nome).toEqual(mockUsuario.nome);
    expect(component.prefilFrom.value.sobreNome).toEqual(mockUsuario.sobreNome);
    expect(component.prefilFrom.value.telefone).toEqual(mockUsuario.telefone);
  }));

  it('should throw error when try to initialize', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Perfil Usuário' };
    const spyOnGetUsuarioById = spyOn(usuarioService, 'getUsuarioById').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');
    localStorageSpy['idUsuario'] = '4';

    // Act
    component.initialize();

    // Assert
    expect(spyOnGetUsuarioById).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  });

  it('should modify data when onSaveClick and show successfully message', fakeAsync(() => {
    // Arrange
    let mockUsuario: IUsuario = {
      id : 22,
      email: 'teste@teste.com',
      nome: 'Teste Usuário',
      sobreNome: 'Teste',
      telefone: '(21) 9999-9999'
    };
    localStorageSpy.setItem('idUsuario',mockUsuario.id);
    const spyOnGetUsuarioById = spyOn(usuarioService, 'getUsuarioById').and.returnValue(from(Promise.resolve(mockUsuario)));
    const editedData = {
      id : 22,
      email: 'teste@teste.com',
      nome: 'Teste Alteração Nome Usuario',
      sobreNome: 'Teste',
      telefone: '(21) 9999-9999'
    };
    const spyOnPutUsuario = spyOn(usuarioService, 'putUsuario').and.returnValue(of(editedData));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open').and.callThrough();

    // Act
    component.ngOnInit();
    flush();
    component.prefilFrom.patchValue(editedData);
    component.onSaveClick();
    flush();

    // Assert
    expect(spyOnGetUsuarioById).toHaveBeenCalled();
    expect(spyOnGetUsuarioById).toHaveBeenCalledOnceWith(mockUsuario.id);
    expect(spyOnPutUsuario).toHaveBeenCalled();
    expect(spyOnPutUsuario).toHaveBeenCalledOnceWith(editedData);
    expect(component.prefilFrom.value.id).toEqual(editedData.id);
    expect(mockUsuario.id).toEqual(editedData.id);
    expect(component.prefilFrom.value.email).toEqual(editedData.email);
    expect(component.prefilFrom.value.nome).toEqual(editedData.nome);
    expect(mockUsuario.nome).not.toEqual(editedData.nome);
    expect(component.prefilFrom.value.sobreNome).toEqual(editedData.sobreNome);
    expect(component.prefilFrom.value.telefone).toEqual(editedData.telefone);
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Dados atualizados com Sucesso.', AlertType.Success);
  }));

  it('should throw error when try to modify data onSaveClick', () => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message onSaveClick Perfil Usuário' };
    const spyOnPutUsuario = spyOn(usuarioService, 'putUsuario').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.onSaveClick();

    // Assert
    expect(spyOnPutUsuario).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  });
});
