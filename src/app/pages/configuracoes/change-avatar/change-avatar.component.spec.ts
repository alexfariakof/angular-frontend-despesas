import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ChangeAvatarComponent } from './change-avatar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent, AlertType } from 'src/app/shared/components';
import { ImagemPerfilService, UsuarioService } from 'src/app/shared/services/api';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { from, throwError } from 'rxjs';
import { IImagemPerfil } from 'src/app/shared/interfaces';

describe('Unit Test ChangeAvatarComponent', () => {
  let component: ChangeAvatarComponent;
  let fixture: ComponentFixture<ChangeAvatarComponent>;
  let mockImagemPerfilService: ImagemPerfilService;
  let mockImagemPerfilUsuario: IImagemPerfil = { url: 'http://alexfariakof.com/testImage.jpp' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeAvatarComponent],
      imports:[CommonModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [FormBuilder, AlertComponent, UsuarioService, NgbActiveModal ]
    });
    fixture = TestBed.createComponent(ChangeAvatarComponent);
    component = fixture.componentInstance;
    mockImagemPerfilService = TestBed.inject(ImagemPerfilService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create Change Avatar Component', () => {
    // Arrange
    localStorage['idUsuario'] = '1';

    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize Change Avatar Component ', fakeAsync(() => {
    // Arrange
    const mockIdUsuario = 2;
    localStorage.setItem('idUsuario', mockIdUsuario.toString());
    const mockRespose = { message: true, imagemPerfilUsuario: mockImagemPerfilUsuario };
    const spyOnGetImagemPerfilUsuarioByIdUsuario = spyOn(mockImagemPerfilService, 'getImagemPerfilUsuarioByIdUsuario').and.returnValue(from(Promise.resolve(mockRespose)));

    // Act
    component.initialize();
    flush();

    // Assert
    expect(spyOnGetImagemPerfilUsuarioByIdUsuario).toHaveBeenCalled();
    expect(spyOnGetImagemPerfilUsuarioByIdUsuario).toHaveBeenCalledWith(mockIdUsuario);
    expect(component.imagemPerfilUsuario.url).not.toBeNull();
    expect(component.imagemPerfilUsuario.url).not.toEqual('../../../../assets/perfil_static.png');
    expect(component.imagemPerfilUsuario.url).toEqual(mockImagemPerfilUsuario.url);
  }));

  it('should initialize Change Avatar Component adn Thnrows Error ', fakeAsync(() => {
    // Arrange
    const errorMessage = { message: 'Fake Error Message Initialize Chart' };
    const spyOnGetImagemPerfilUsuarioByIdUsuario = spyOn(mockImagemPerfilService, 'getImagemPerfilUsuarioByIdUsuario').and.returnValue(throwError(errorMessage));
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.initialize();

    // Assert
    expect(spyOnGetImagemPerfilUsuarioByIdUsuario).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  }));


});
