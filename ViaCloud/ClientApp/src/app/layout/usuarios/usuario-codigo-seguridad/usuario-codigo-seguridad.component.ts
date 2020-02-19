import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService, DataApi } from '../../../Services/HTTPClient/base.service';
import { LibrariesService } from '../../../Services/Common/libraries-service.service';
import { Usuario } from '../../../Models/Usuarios/Usuario';

@Component({
    selector: 'app-usuario-codigo-seguridad',
    templateUrl: './usuario-codigo-seguridad.component.html',
    styleUrls: ['./usuario-codigo-seguridad.component.scss']
})
export class UsuarioCodigoSeguridadComponent implements OnInit {

     //currentUser: UserAuthModel;
     usuarioID: number;
    @Input()  usuarioNombreCompleto: string;
    @Input()  CorreoNotificadoCambioClave: string;
    @Output()  codigoValidado = new EventEmitter<boolean>();
    @Output()  OnClickbtnCancelar = new EventEmitter<boolean>();

    public btnConfirmarCargando: boolean = false;
    public btnReenviarCargando: boolean = false;
     submitted: boolean = false;
     Formulario: FormGroup;

  constructor(public  base: BaseService,
    public library: LibrariesService, public  formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.CreateForm();
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.usuarioID = this.currentUser.id;
    }

     onSubmit() {

        this.submitted = true;

        if (this.Formulario.invalid) {
            return;
        }

        this.ValidarCodigoSeguridadMAR();
    }

     Cancelar() {
        this.OnClickbtnCancelar.emit(false);
    }

    public ValidarCodigoSeguridadMAR() {
        this.btnConfirmarCargando = true;

        let parametros = {
            "UsuarioIDLogueado": this.usuarioID,
            "usuarioNombreCompleto": this.usuarioNombreCompleto,
            "CorreoNotificadoCambioClave": this.CorreoNotificadoCambioClave,
            "codigoSeguridadMAR": this.f.codigoSeguridadMAR.value
        };

        this.base.DoPost<Usuario>(DataApi.Usuario, "ValidarCodigoConfirmacion", parametros).subscribe(x => {

            this.btnConfirmarCargando = false;
            this.codigoValidado.emit(x.ok);
        }, error => {
            this.MostrarMensajeDeErrorConexionServidor();
            this.btnConfirmarCargando = false;
        });
    }

    public EnviarCodigoSeguridadMAR() {
        this.btnReenviarCargando = true;
        let parametros = {
            //"UsuarioIDLogueado": this.currentUser.id,
            //"CorreoRecibidorCodigo": this.currentUser.email,
        };

        this.base.DoPost<Usuario>(DataApi.Usuario, "EnviarCorreoConfirmacion", parametros).subscribe(x => {
            if (!x.ok) {
                this.MostrarMensajeDeErrorInterno(x.errores[0]);
            } else {
                this.MostrarMensajeOperacionRealizada("Código enviado");
            }
            this.btnReenviarCargando = false;

        }, error => {
            this.MostrarMensajeDeErrorConexionServidor();
            this.btnReenviarCargando = false;
        });

    }


    get f() { return this.Formulario.controls; }


     CreateForm() {
        this.Formulario = this.formBuilder.group({
            codigoSeguridadMAR: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

     MostrarMensajeDeErrorInterno(error: string) {
        //this.library.showToast(error, { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }
     MostrarMensajeDeErrorConexionServidor() {
        //this.library.showToast("Error al conectar con el servidor", { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }
     MostrarMensajeOperacionRealizada(mensaje: string = "Operación realizada.") {
        //this.library.showToast(mensaje, { classname: 'bg-success text-white ', icon: "fas fa-check-square" });
    }

}
