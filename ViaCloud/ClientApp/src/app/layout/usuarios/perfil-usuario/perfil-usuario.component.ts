import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuarios } from '../../../Models/Usuarios/usuarios';
import { UserAuthModel } from '../../../Models/Auth/user-auth-model';
import { UsuarioCodigoSeguridadComponent } from '../usuario-codigo-seguridad/usuario-codigo-seguridad.component';
import { BaseService, DataApi } from '../../../Services/HTTPClient/base.service';
import { LibrariesService } from '../../../Services/Common/libraries-service.service';
import { MustMatch } from '../../../Helpers/Validators/must-match.validator';

@Component({
    selector: 'app-perfil-usuario',
    templateUrl: './perfil-usuario.component.html',
    styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

     currentUser: UserAuthModel;
    public ElUsuario: Usuarios = new Usuarios();
     Cargando: boolean = false;
     Formulario: FormGroup;
    submitted: boolean = false;
    btnGuardarCargando = false;
    mostrarComponenteCodigoSeguridad = false;

    @ViewChild(UsuarioCodigoSeguridadComponent, { static: false }) componenteCodigoSeguridad: UsuarioCodigoSeguridadComponent;


     claveAnterior: string = "";
     nombreCompletoUsuarioLogueado: string = "";
     correoUsuarioModificado: string = "";

  constructor(public base: BaseService, modalConfigs: NgbModalConfig, public  modalService: NgbModal,
    public library: LibrariesService, public formBuilder: FormBuilder) {
        modalConfigs.backdrop = 'static';
        modalConfigs.keyboard = false;
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.getUser(this.currentUser.id);
        this.CreateForm();
    }

    open(content) {
        let z = this.ElUsuario;
        this.Formulario.setValue({
            usuarioID: z.usuarioID,
            usuNombre: z.usuNombre,
            usuApellido: z.usuApellido,
            usuCedula: z.usuCedula,
            usuFechaNac: z.usuFechaNac,
            usuUserName: z.usuUserName,
            email: z.email,
            usuClave: z.usuClave,
            usuClaveConfirm: ""
        });
        this.modalService.open(content, { centered: false });
    }

    get f() { return this.Formulario.controls; }

     CreateForm() {
        this.Formulario = this.formBuilder.group({
            usuarioID: [this.currentUser.id],
            usuNombre: ['', Validators.required],
            usuApellido: ['', Validators.required],
            usuCedula: ['', Validators.required],
            usuFechaNac: [''],
            usuUserName: ['', Validators.required],
            email: ['', [Validators.required]],
            usuClave: ['', [Validators.required, Validators.minLength(6)]],
            usuClaveConfirm: ['', [Validators.required, Validators.minLength(6)]]
        }, {
            validator: MustMatch('usuClave', 'usuClaveConfirm')
        });
    }

     getUser(UsuarioID: number) {
        this.submitted = false;
        this.Cargando = true;
        this.base.DoPost<Usuarios>(DataApi.MUsuario, "GetToEdit", { "UsuarioID": UsuarioID })
            .subscribe(x => {
                if (x.ok) {
                    let z = x.records[0];
                    this.ElUsuario = z;
                    this.Formulario.setValue({
                        usuarioID: z.usuarioID,
                        usuNombre: z.usuNombre,
                        usuApellido: z.usuApellido,
                        usuCedula: z.usuCedula,
                        usuFechaNac: z.usuFechaNac,
                        usuUserName: z.usuUserName,
                        email: z.email,
                        usuClave: z.usuClave,
                        usuClaveConfirm: ""
                    });
                    this.claveAnterior = "";

                    let clave = z.usuClave;
                    this.claveAnterior = clave;

                } else {
                    this.MostrarMensajeDeErrorInterno(x.errores[0]);
                }
                this.Cargando = false;
            }, error => {
                this.MostrarMensajeDeErrorConexionServidor();
                this.Cargando = false;
            });
    }


     onSubmit() {
        this.submitted = true;

        if (this.f.usuClave.value == this.claveAnterior) {
            this.f.usuClaveConfirm.setValue(this.claveAnterior);
        }

        if (this.Formulario.invalid) {
            return;
        }


        if (this.f.usuClave.value == this.claveAnterior) {// si no cambia la clave
            this.guardarUsuario();
        } else {
            this.nombreCompletoUsuarioLogueado = this.f.usuNombre.value + " " + this.f.usuApellido.value;
            this.correoUsuarioModificado = this.f.email.value;
            this.mostrarComponenteCodigoSeguridad = true;
            this.modalService.dismissAll();
            this.componenteCodigoSeguridad.EnviarCodigoSeguridadMAR();
        }

    }

     guardarUsuario(): void {
        this.componenteCodigoSeguridad.btnConfirmarCargando = true;
        this.btnGuardarCargando = true;
        this.base.DoPost<Usuarios>(DataApi.MUsuario, "UpdatePerfil", this.Formulario.value)
            .subscribe(x => {
                if (x.ok) {
                    this.MostrarMensajeOperacionRealizada();
                    this.getUser(this.currentUser.id);
                    this.mostrarComponenteCodigoSeguridad = false;
                } else {
                    this.MostrarMensajeDeErrorInterno(x.errores[0]);
                }
                this.modalService.dismissAll();
                this.getUser(this.ElUsuario.usuarioID);
                this.componenteCodigoSeguridad.btnConfirmarCargando = false;
                this.btnGuardarCargando = false;
            }, error => {
                this.MostrarMensajeDeErrorConexionServidor();
                this.componenteCodigoSeguridad.btnConfirmarCargando = false;
                this.btnGuardarCargando = false;
            });
    }


     ValidarCodigoSeguridad(codigoEsValido: boolean) {
        if (!codigoEsValido) {
            this.MostrarMensajeCodigoInvalido();
        } else {
            this.guardarUsuario();
        }
    }

     Cancelar() {
        this.mostrarComponenteCodigoSeguridad = false;
        this.getUser(this.currentUser.id);
    }


     MostrarMensajeDeErrorInterno(error: string) {
        this.library.showToast("Error interno: " + error, { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }
     MostrarMensajeCodigoInvalido() {
        this.library.showToast("Código MAR inválido", { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }
     MostrarMensajeDeErrorConexionServidor() {
        this.library.showToast("Error al conectar con el servidor", { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }
     MostrarMensajeOperacionRealizada(mensaje: string = "Operación realizada.") {
        this.library.showToast(mensaje, { classname: 'bg-success text-white ', icon: "fas fa-check-square" });
    }

}
