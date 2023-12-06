import { MenuService } from 'src/app/shared/services';
import { UsuarioService } from './../../shared/services/api/usuarios/usuario.service';
import { UserDataService } from 'src/app/shared/services';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IUsuario } from 'src/app/shared/interfaces';
import { AlertComponent, AlertType } from 'src/app/shared/components';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  prefilFrom: FormGroup & IUsuario = this.formbuilder.group({}) as FormGroup & IUsuario;

  constructor(
    private menuService: MenuService,
    public formbuilder: FormBuilder,
    public modalAlert: AlertComponent,
    public usuarioService: UsuarioService,
    private userDataService: UserDataService
    ) { menuService.setMenuSelecionado(6); }

  ngOnInit(): void{
    this.prefilFrom = this.formbuilder.group({ email: ['', [Validators.required, Validators.email]],
    id: this.userDataService.getIdUsuario(),
    nome: ['', [Validators.required]],
    sobreNome: '',
    telefone: ['', [Validators.required]],
    }) as FormGroup & IUsuario;
    this.initialize();
  }

  initialize = () => {
    this.usuarioService.getUsuarioById(this.userDataService.getIdUsuario())
      .subscribe({
        next: (result: IUsuario) => {
          if (result && result !== undefined && result !== null) {
            this.prefilFrom.patchValue(result);
          }
        },
        error: (response: any) => {
          this.modalAlert.open(AlertComponent, response.message, AlertType.Warning);
        }
      });
  }

  onSaveClick() {
    this.usuarioService.putUsuario(this.prefilFrom.getRawValue() as IUsuario)
    .subscribe({
      next: (result: IUsuario) => {
        if (result && result !== undefined && result !== null) {
          this.modalAlert.open(AlertComponent, 'Dados atualizados com Sucesso.', AlertType.Success);
        }
      },
      error: (error: any) => {
        this.modalAlert.open(AlertComponent, error.message, AlertType.Warning);
      }
    });
  }
}
