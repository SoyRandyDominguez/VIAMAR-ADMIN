import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../Models/Usuarios/usuarios';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService, DataApi } from '../../../Services/HTTPClient/base.service';
import { LibrariesService } from '../../../Services/Common/libraries-service.service';

@Component({
    selector: 'app-usuario-listado',
    templateUrl: './usuario-listado.component.html',
    styleUrls: ['./usuario-listado.component.scss']
})
export class UsuarioListadoComponent implements OnInit {

     usuarios: Usuarios[] = []

     Search: string = "";
     paginaNumeroActual = 1;
     Cargando: boolean = false;
     CargandoDelete: boolean = false;
     totalPaginas: number = 0;
     paginaSize: number = 5;
     paginaTotalRecords: number = 0;
     usuarioIDToDelete: number = 0;

     arrayLoading = new Array(this.paginaSize);


  constructor(public base: BaseService, public library: LibrariesService, public  modalService: NgbModal) { }

    ngOnInit() {

        this.arrayLoading = new Array(this.paginaSize);
        this.getUsuarios();
    }



     getUsuarios() {
        this.Cargando = true;
        this.base.GetAllWithPagination<Usuarios>(DataApi.MUsuario, "GetUsuarios", "UsuarioID", this.paginaNumeroActual,
            this.paginaSize, true, { "@Search": this.Search }).subscribe(x => {
                //console.log(x);


                if (x.ok) {
                    //console.log(x.records);
                    this.usuarios = x.records;
                    this.totalPaginas = x.pagina.totalPaginas;
                    this.paginaTotalRecords = x.pagina.totalRecords;
                    this.paginaSize = x.pagina.paginaSize;
                    this.arrayLoading = new Array(0);
                }
                this.Cargando = false;
            }, error => {
                this.library.showToast("Error al conectar el servidor", { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
                this.Cargando = false;
            });
    }

    deleteUsuario(usuarioID: number, usuActivo: boolean) {
        this.CargandoDelete = true;
        this.base.DoPost<Usuarios>(DataApi.MUsuario, "DeleteUsuario", { "@UsuarioID": usuarioID, "@UsuActivo": !usuActivo}).subscribe(x => {
            if (x.ok) {
                //this.CloseConfirmacionModal();
                this.MostrarMensajeOperacionRealizada();
                this.getUsuarios();
            } else {
                this.MostrarMensajeDeErrorInterno(x.errores[0]);
            }
            this.CargandoDelete = false;
        }, error => {
            this.MostrarMensajeDeErrorConexionServidor();
            this.CargandoDelete = false;
        });
    }


    // openConfirmacion(modal, usuarioID: number) {
    //    this.usuarioIDToDelete = usuarioID;
    //    this.modalService.open(modal);
    //}

    // CloseConfirmacionModal() {
    //    this.usuarioIDToDelete = 0;
    //    this.modalService.dismissAll();
    //}

     MostrarMensajeDeErrorInterno(error: string) {
        this.library.showToast("Error interno: " + error, { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }

     MostrarMensajeDeErrorConexionServidor() {
        this.library.showToast("Error al conectar con el servidor", { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }
     MostrarMensajeOperacionRealizada(mensaje: string = "Operación realizada.") {
        this.library.showToast(mensaje, { classname: 'bg-success text-white ', icon: "fas fa-check-square" });
    }




}


