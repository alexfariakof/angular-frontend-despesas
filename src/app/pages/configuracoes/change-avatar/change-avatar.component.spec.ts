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
      imports: [CommonModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [FormBuilder, AlertComponent, UsuarioService, NgbActiveModal]
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

  it('should handle avatar upload', () => {
    // Arrange
    const mockFile = new File(['mock file'], 'avatar.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [mockFile] } };

    // Act
    component.handleAvatarUpload(event);

    // Assert
    expect(component.file).toEqual(mockFile);
    expect(component.imagemPerfilUsuario.url).not.toBeNull();
    expect(component.fileLoaded).toBeTruthy();
  });

  it('should handle and create imagem Perfil successfully', fakeAsync(() => {
    // Arrange
    let mockImagemPerfilUsuario: IImagemPerfil = { url: 'http://alexfariakof.com/testImage.jpp' };
    let mockFile = new File(['mock file'], 'avatar.jpg', { type: 'image/jpeg' });
    const spyOnImagemPerfilService = spyOn(mockImagemPerfilService, 'createImagemPerfilUsuario').and.returnValue(from(Promise.resolve({ message: true, imagemPerfilUsuario: mockImagemPerfilUsuario })));
    const mockIdUsuario = 3;
    localStorage.setItem('idUsuario', mockIdUsuario.toString());
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.imagemPerfilUsuario.id = null;
    component.file = mockFile;
    component.handleImagePerfil();
    flush();

    // Assert
    expect(spyOnImagemPerfilService).toHaveBeenCalled();
    expect(spyOnImagemPerfilService).toHaveBeenCalledWith(mockFile);
    expect(component.file).toBeNull();
    expect(component.fileLoaded).toBeFalsy();
    expect(component.imagemPerfilUsuario).toEqual(mockImagemPerfilUsuario);
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Imagem adicionada com sucesso!', AlertType.Success);
  }));

  it('should try to create imagem Perfil without upload image', fakeAsync(() => {
    // Arrange
    let errorMessage = { message: 'Fake Error Message nto uplaod image' };
    let mockFile = null;
    const spyOnImagemPerfilService = spyOn(mockImagemPerfilService, 'createImagemPerfilUsuario').and.returnValue(throwError(errorMessage));
    const mockIdUsuario = 3;
    localStorage.setItem('idUsuario', mockIdUsuario.toString());
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.imagemPerfilUsuario.id = null;
    component.file = mockFile;
    component.handleImagePerfil();
    flush();

    // Assert
    expect(spyOnImagemPerfilService).not.toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'É preciso carregar uma nova imagem!', AlertType.Warning);
  }));

  it('should handle and try create imagem Perfil and throws error', fakeAsync(() => {
    // Arrange
    let errorMessage = { message: 'Fake Error Message ' };
    let mockFile = new File(['mock file'], 'avatar.jpg', { type: 'image/jpeg' });
    const spyOnImagemPerfilService = spyOn(mockImagemPerfilService, 'createImagemPerfilUsuario').and.returnValue(throwError(errorMessage));
    const mockIdUsuario = 3;
    localStorage.setItem('idUsuario', mockIdUsuario.toString());
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.imagemPerfilUsuario.id = null;
    component.file = mockFile;
    component.handleImagePerfil();
    flush();

    // Assert
    expect(spyOnImagemPerfilService).toHaveBeenCalled();
    expect(spyOnImagemPerfilService).toHaveBeenCalledWith(mockFile);
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  }));

  it('should handle and update imagem Perfil successfully', fakeAsync(() => {
    // Arrange
    let mockImagemPerfilUsuario: IImagemPerfil = { url: 'http://alexfariakof.com/testImage.jpp' };
    let mockFile = new File(['mock file'], 'avatar.jpg', { type: 'image/jpeg' });
    const spyOnImagemPerfilService = spyOn(mockImagemPerfilService, 'updateImagemPerfilUsuario').and.returnValue(from(Promise.resolve({ message: true, imagemPerfilUsuario: mockImagemPerfilUsuario })));
    const mockIdUsuario = 3;
    localStorage.setItem('idUsuario', mockIdUsuario.toString());
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.imagemPerfilUsuario.id = 1;
    component.file = mockFile;
    component.handleImagePerfil();
    flush();

    // Assert
    expect(spyOnImagemPerfilService).toHaveBeenCalled();
    expect(spyOnImagemPerfilService).toHaveBeenCalledWith(mockFile);
    expect(component.file).toBeNull();
    expect(component.fileLoaded).toBeFalsy();
    expect(component.imagemPerfilUsuario).toEqual(mockImagemPerfilUsuario);
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Imagem de perfil usuário alterada com sucesso!', AlertType.Success);
  }));

  it('should handle and try update imagem Perfil and throws error', fakeAsync(() => {
    // Arrange
    let errorMessage = { message: 'Fake Error Message updateImagemPerfilUsuario' };
    let mockFile = new File(['mock file'], 'avatar.jpg', { type: 'image/jpeg' });
    const spyOnImagemPerfilService = spyOn(mockImagemPerfilService, 'updateImagemPerfilUsuario').and.returnValue(throwError(errorMessage));
    const mockIdUsuario = 3;
    localStorage.setItem('idUsuario', mockIdUsuario.toString());
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.imagemPerfilUsuario.id = 1;
    component.file = mockFile;
    component.handleImagePerfil();
    flush();

    // Assert
    expect(spyOnImagemPerfilService).toHaveBeenCalled();
    expect(spyOnImagemPerfilService).toHaveBeenCalledWith(mockFile);
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  }));

  it('should handle and delete imagem Perfil successfully', fakeAsync(() => {
    // Arrange
    const spyOnImagemPerfilService = spyOn(mockImagemPerfilService, 'deleteImagemPerfilUsuario').and.returnValue(from(Promise.resolve({ message: true })));
    const mockIdUsuario = 3;
    localStorage.setItem('idUsuario', mockIdUsuario.toString());
    const alertOpenSpy = spyOn(component.modalAlert, 'open').and.callThrough();

    // Act
    component.handleDeleteImagePerfil();
    flush();

    // Assert
    expect(spyOnImagemPerfilService).toHaveBeenCalled();
    expect(spyOnImagemPerfilService).toHaveBeenCalledWith(mockIdUsuario);
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, 'Imagem de perfil usuário excluída com sucesso!', AlertType.Success);
    expect(component.file).toBeNull();
    expect(component.fileLoaded).toBeFalsy();

  }));

  it('should handle and try delete imagem Perfil and throws error', fakeAsync(() => {
    // Arrange
    let errorMessage = { message: 'Fake Error Message deleteImagemPerfilUsuario' };
    const spyOnImagemPerfilService = spyOn(mockImagemPerfilService, 'deleteImagemPerfilUsuario').and.returnValue(throwError(errorMessage));
    const mockIdUsuario = 3;
    localStorage.setItem('idUsuario', mockIdUsuario.toString());
    const alertOpenSpy = spyOn(TestBed.inject(AlertComponent), 'open');

    // Act
    component.handleDeleteImagePerfil();
    flush();

    // Assert
    expect(spyOnImagemPerfilService).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalled();
    expect(alertOpenSpy).toHaveBeenCalledWith(AlertComponent, errorMessage.message, AlertType.Warning);
  }));
});
