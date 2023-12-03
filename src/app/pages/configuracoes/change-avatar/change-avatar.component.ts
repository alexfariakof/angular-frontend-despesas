import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertComponent, AlertType } from 'src/app/shared/components';
import { IImagemPerfil } from 'src/app/shared/interfaces';
import { UserDataService } from 'src/app/shared/services';
import { ImagemPerfilService } from 'src/app/shared/services/api';
@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {
  @Input() handleAvatarUploaded: (event: Event) => void;
  formAvatar: FormGroup;
  file: File | null = null;
  fileLoaded = false;
  imagemPerfilUsuario: IImagemPerfil = {
    url: '../../../../assets/perfil_static.png',
    id: 0,
    name: '',
    type: '',
    contentType: '',
    idUsuario: 0
  };

  constructor(
    public imagemPerfilService: ImagemPerfilService,
    public userDataService: UserDataService,
    public modalAlert: AlertComponent
    ) {
    this.formAvatar = new FormGroup({
      uploadPhoto: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize = (): void  => {
    this.imagemPerfilService.getImagemPerfilUsuarioByIdUsuario(this.userDataService.getIdUsuario())
    .subscribe({
      next: (response: any) => {
        if (response.message === true && response.imagemPerfilUsuario !== undefined && response.imagemPerfilUsuario !== null) {
          this.imagemPerfilUsuario  = response.imagemPerfilUsuario;
        }
      },
      error: (response: any) => {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });;
  }

  handleAvatarUpload = (event: any): void => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      this.file = uploadedFile;
      this.imagemPerfilUsuario.url = URL.createObjectURL(uploadedFile);
      this.fileLoaded = true;
    }
  }

  handleImagePerfil = (): void =>  {
    if (this.file !== null) {
      if (this.imagemPerfilUsuario === null) {
        this.imagemPerfilService.createImagemPerfilUsuario(this.file, this.userDataService.getIdUsuario())
        .subscribe({
          next: (result: any) => {
            if (result.message === true) {
              this.file = null;
              this.fileLoaded = false;
              this.imagemPerfilUsuario = result.imagemPerfilUsuario;
              this.modalAlert.open(AlertComponent, 'Imagem adicionada com sucesso!', AlertType.Success);
            }
          },
          error: (response: any) => {
            this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
          }
        });
      }
      else {
        this.imagemPerfilService.updateImagemPerfilUsuario(this.file, this.userDataService.getIdUsuario())
        .subscribe({
          next: (result: any) => {
            if (result.message === true) {
              this.file = null;
              this.fileLoaded = false;
              this.imagemPerfilUsuario = result.imagemPerfilUsuario;
              this.modalAlert.open(AlertComponent, 'Imagem de perfil usuário alterada com sucesso!', AlertType.Success);
            }
          },
          error: (response: any) => {
            this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
          }
        });
      }
    }
    else {
      this.modalAlert.open(AlertComponent, 'É preciso carregar uma nova imagem!', AlertType.Warning);
    }
  }

  handleDeleteImagePerfil = (): void  => {
    this.imagemPerfilService.deleteImagemPerfilUsuario(this.userDataService.getIdUsuario())
    .subscribe({
      next: (result: any) => {
        if (result.message === true) {
          this.file = null;
          this.fileLoaded = false;
          this.imagemPerfilUsuario = null;
          this.modalAlert.open(AlertComponent, 'Imagem de perfil usuário excluída com sucesso!', AlertType.Success);
        }
      },
      error: (response: any) => {
        this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
      }
    });
  }
}
