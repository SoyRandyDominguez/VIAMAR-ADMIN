import { Component, OnInit } from '@angular/core';
import { CitaForList } from '../../model/CitaForList';
import { BackendService } from '../../../../core/http/service/backend.service';
import { ToastService } from '../../../../component/toast/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../core/authentication/service/authentication.service';
import { DataApi } from '../../../../shared/enums/DataApi.enum';
import { ResponseContenido } from '../../../../core/http/model/ResponseContenido';
import { Parametro } from '../../../../core/http/model/Parametro';

@Component({
    selector: 'app-cita-listado',
    templateUrl: './cita-listado.component.html',
    styleUrls: ['./cita-listado.component.css']
})
export class CitaListadoComponent implements OnInit {


    // COPIAR AL CREAR UN LISTADO NUEVO
    Search: string = "";
    paginaNumeroActual = 1;
    Cargando: boolean = false;
    CargandoBar: boolean = false;
    totalPaginas: number = 0;
    paginaSize: number = 5;
    paginaTotalRecords: number = 0;
    arrayLoading = new Array(this.paginaSize);
    citas: CitaForList[] = [] //tu modelo


    constructor(
        private httpService: BackendService,
        private toast: ToastService,
        private modalService: NgbModal,
        private auth: AuthenticationService,
    ) { }

    ngOnInit() {

        this.getCitas();

    }

    getCitas() {

        this.Cargando = true;

        let parametros: Parametro[] = [
            { key: "jamaica", value: 1 },
            { key: "busquedaText", value: this.Search },
            { key: "prende", value: 1 },
        ]

        this.httpService.GetAllWithPagination<CitaForList>(DataApi.Cita, "GetCitas", "CitaID", this.paginaNumeroActual,
            this.paginaSize, false, parametros).subscribe(x => {

                if (x.ok) {
                    this.citas = x.records;
                    this.asignarPagination(x);
                } else {
                    this.toast.Danger(x.errores[0]);
                    console.error(x.errores[0]);
                }
                this.arrayLoading = new Array(0);
                this.Cargando = false;
            }, error => {
                console.error(error);
                this.toast.MostrarMensajeDeErrorConexionServidor();
                this.Cargando = false;
                this.arrayLoading = new Array(0);
            });

    }


    asignarPagination(x: ResponseContenido<any>) {

        if (x.pagina != null) {
            this.totalPaginas = x.pagina.totalPaginas == null ? 0 : x.pagina.totalPaginas;
            this.paginaTotalRecords = x.pagina.totalRecords == null ? 0 : x.pagina.totalRecords;
            this.paginaSize = x.pagina.paginaSize == null ? 0 : x.pagina.paginaSize;
        } else {
            this.totalPaginas = 0;
            this.paginaTotalRecords = 0;
            this.paginaSize = 0;
        }

    }



}
