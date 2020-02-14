import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../../Models/Usuarios/usuarios';
import { BaseService, DataApi } from '../../../../Services/HTTPClient/base.service';
import { LibrariesService } from '../../../../Services/Common/libraries-service.service';

@Component({
    selector: 'app-tarjeta-usuarios-flujo',
    templateUrl: './tarjeta-usuarios-flujo.component.html',
    styleUrls: ['./tarjeta-usuarios-flujo.component.scss']
})
export class TarjetaUsuariosFlujoComponent implements OnInit {

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

  constructor(public base: BaseService, public library: LibrariesService) { }

    ngOnInit() {

        this.arrayLoading = new Array(this.paginaSize);
        this.getUsuarios();
    }
 

     getUsuarios() {
        this.Cargando = true;
        this.base.GetAllWithPagination<Usuarios>(DataApi.MUsuario, "GetUsuarios", "UsuarioID", this.paginaNumeroActual,
            this.paginaSize, true, { "@Search": this.Search }).subscribe(x => {

                if (x.ok) {
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

}
