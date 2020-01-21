import { Component, OnInit, ViewChild } from '@angular/core';
import { PermisosTreeViewComponent } from '../permisos-tree-view/permisos-tree-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from '../../../Models/Usuarios/usuarios';
import { PermisosTreeView } from '../../../Models/Usuarios/permisos-tree-view';
import { UsuarioFormularioComponent } from '../usuario-formulario/usuario-formulario.component';
import { UsuariosRiferosComponent } from '../usuarios-riferos/usuarios-riferos.component';
import { UsuarioCodigoSeguridadComponent } from '../usuario-codigo-seguridad/usuario-codigo-seguridad.component';
import { UserAuthModel } from '../../../Models/Auth/user-auth-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService, DataApi } from '../../../Services/HTTPClient/base.service';
import { LibrariesService } from '../../../Services/Common/libraries-service.service';
@Component({
    selector: 'app-usuario-tabs',
    templateUrl: './usuario-tabs.component.html',
    styleUrls: ['./usuario-tabs.component.scss'],
})
export class UsuarioTabsComponent implements OnInit {
    permisos: object[];

    public ParamUsuarioID: number;
    public usuario: Usuarios;
     titulo: string = "Nuevo usuario";
     nombreCompletoUsuarioLogueado: string;
     mostrarComponenteCodigoSeguridad: boolean;
     correoUsuarioModificado: string;
     currentUser: UserAuthModel;
     claveAnterior: string = "";
   


    @ViewChild('tree', { static: false }) child: PermisosTreeViewComponent;
    @ViewChild('form', { static: false }) form: UsuarioFormularioComponent;
    @ViewChild('rifero', { static: false }) riferos: UsuariosRiferosComponent;
    @ViewChild(UsuarioCodigoSeguridadComponent, { static: false }) componenteCodigoSeguridad: UsuarioCodigoSeguridadComponent;


  constructor(public base: BaseService, public  route: ActivatedRoute,
    public  router: Router, public library: LibrariesService, public  modalService: NgbModal) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.ParamUsuarioID = Number(this.route.snapshot.paramMap.get('id'));
        //this.child.setUsuarioID(Number(this.route.snapshot.paramMap.get('id')));

        if (this.ParamUsuarioID != 0) {
            this.titulo = "Editar usuario";
            //this.GetOneRiferoById(id);
        }

        this.nombreCompletoUsuarioLogueado = this.currentUser.firstName + " " + this.currentUser.lastName;

    }

    setearValorUsuario(us: Usuarios) {
        this.usuario = us;
        if (this.usuario.usuarioID > 0) { // si es editando valida el codigo, de lo contrario solo guarda y ya.

            if (this.form.claveAnterior == this.usuario.usuClave) {
                this.guardarUsuario();
            } else {
                this.correoUsuarioModificado = this.usuario.email;
                this.mostrarComponenteCodigoSeguridad = true;
                this.componenteCodigoSeguridad.EnviarCodigoSeguridadMAR();
            }
        } else {
            this.guardarUsuario();
        }

    }

    mostrarBalanceMinimoEnFormulario (mostrar:boolean){
        this.form.mostrarBalanceMinimoCaja = mostrar;
    }

    open(content) {
        this.modalService.open(content, { centered: false, size:'lg' });
        //this.cleanZona();
        //this.cleanZona();
    }


    guardarUsuario(): void {


        this.form.btnGuardarCargando = true;
        this.componenteCodigoSeguridad.btnConfirmarCargando = true;
        this.base.DoPost<Usuarios>(DataApi.MUsuario, "CrearOActualizar", this.usuario)
            .subscribe(x => {
                let UsuarioID;
                x.records.forEach(y => {
                    UsuarioID = y.usuarioID
                });

                if (x.ok) {
                    this.base.DoPostRecord<PermisosTreeView>(DataApi.PermisosUsuario, "CreateOrUpdate", { "UsuarioID": UsuarioID, "balanceMinimoCaja": this.form.f.balanceMinimoCaja.value}, this.child.permisosTree)
                        .subscribe(z => {
                            if (z.ok) {
                                this.MostrarMensajeOperacionRealizada();
                            } else {
                                this.MostrarMensajeDeErrorInterno(z.errores[0]);
                            }
                            this.form.btnGuardarCargando = false;
                            this.componenteCodigoSeguridad.btnConfirmarCargando = false;
                            this.router.navigateByUrl("/usuarios");

                        }, error => {
                            this.MostrarMensajeDeErrorConexionServidor();
                            this.form.btnGuardarCargando = false;
                            this.componenteCodigoSeguridad.btnConfirmarCargando = false;
                        });

                } else {
                    this.MostrarMensajeDeErrorInterno(x.errores[0]);
                    this.form.btnGuardarCargando = false;
                    this.componenteCodigoSeguridad.btnConfirmarCargando = false;
                }
            }, error => {
                this.MostrarMensajeDeErrorConexionServidor();
                this.form.btnGuardarCargando = false;
                this.componenteCodigoSeguridad.btnConfirmarCargando = false;
            });
    }


     ValidarCodigoSeguridad(codigoHaSidoValidado) {

        if (!codigoHaSidoValidado) {
            this.MostrarMensajeCodigoInvalido();
        } else {
            this.guardarUsuario();
        }

    }
     Cancelar() {
        this.mostrarComponenteCodigoSeguridad = false;
        this.ngOnInit();
    }

     MostrarMensajeDeErrorConexionServidor() {
        this.library.showToast("Error al conectar con el servidor", { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }

     MostrarMensajeDeErrorInterno(error: string) {
        this.library.showToast("Error interno: " + error, { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }

     MostrarMensajeOperacionRealizada(mensaje: string = "Operación realizada.") {
        this.library.showToast(mensaje, { classname: 'bg-success text-white ', icon: "fas fa-check-square" });
    }

     MostrarMensajeCodigoInvalido() {
        this.library.showToast("Código MAR inválido", { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }

}
