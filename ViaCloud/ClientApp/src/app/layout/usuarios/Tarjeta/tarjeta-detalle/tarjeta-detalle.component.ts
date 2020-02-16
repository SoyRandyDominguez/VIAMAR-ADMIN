import { Component, OnInit, Input } from '@angular/core';
import { TarjetaClaves } from '../../../../Models/Usuarios/TarjetaClaves';
import { BaseService, DataApi } from '../../../../Services/HTTPClient/base.service';
import { LibrariesService } from '../../../../Services/Common/libraries-service.service';

@Component({
    selector: 'app-tarjeta-detalle',
    templateUrl: './tarjeta-detalle.component.html',
    styleUrls: ['./tarjeta-detalle.component.scss']
})
export class TarjetaDetalleComponent implements OnInit {

     ListaTokensTarjeta = [];
    @Input() usuarioID: number = 0;

     tarjeta: TarjetaClaves = new TarjetaClaves();
     poseeTarjeta: boolean = false;
     Cargando: boolean = false;
     btnGuardarCargando: boolean = false;

  constructor(public base: BaseService,
        public library: LibrariesService) { }

    ngOnInit() {
        this.getTarjetaClaves();
    }


     getTarjetaClaves() {
        this.Cargando = true;
        this.base.DoPost<TarjetaClaves>(DataApi.MUsuario, "getTarjetaClaves", { "usuarioID": this.usuarioID })
            .subscribe(x => {

                if (x.ok) {

                    this.tarjeta = x.valores[0];
                    if (x.valores != null && x.valores.length > 0 && this.tarjeta.tarjetaID > 0) {

                        this.poseeTarjeta = true;
                        this.ListaTokensTarjeta = JSON.parse(this.tarjeta.tokens);

                    } else {

                        let listadoClavesRamdon = this.generarTokensRandomTarjeta();
                        this.tarjeta = new TarjetaClaves();
                        this.poseeTarjeta = false;

                    }
                } else {
                    this.MostrarMensajeDeErrorInterno(x.errores[0]);
                }
                this.Cargando = false;

            }, error => {
                this.MostrarMensajeDeErrorConexionServidor();
                this.Cargando = false;

            });
    }



     registrarTarjeta() {
        this.btnGuardarCargando = true;

        this.tarjeta.tokens = JSON.stringify(this.ListaTokensTarjeta);
        this.tarjeta.usuarioID = this.usuarioID;
        this.tarjeta.serial = 0;
        this.tarjeta.comentario = "";
        this.tarjeta.activo = true;
        this.tarjeta.tarjetaID = 0;
        this.base.DoPost<TarjetaClaves>(DataApi.MUsuario, "insertarOActualizarTarjetaClave", this.tarjeta)
            .subscribe(x => {

                if (x.ok) {
                    this.MostrarMensajeOperacionRealizada();
                    this.getTarjetaClaves();
                } else {
                    this.MostrarMensajeDeErrorInterno(x.errores[0]);
                }
                this.btnGuardarCargando = false;

            }, error => {
                this.btnGuardarCargando = false;
                this.MostrarMensajeDeErrorConexionServidor();
            });

    }

     generarNuevasClavesATarjeta() {

        let listadoClavesNuevas = this.generarTokensRandomTarjeta();
        this.mostrarClavesEnTarjetaVista(listadoClavesNuevas);

    }

     generarTokensRandomTarjeta(): Set<string> {

        let listaClaves: Set<string> = new Set();
        let claveGenerada: string;

        for (; listaClaves.size < 40;) {
            claveGenerada = Math.round(Math.random() * 9999).toString().padEnd(4, "0");
            listaClaves.add(claveGenerada);
        }

        return listaClaves;

    }

     formatPaddingNumber(numero: number,cantidadRellenos:number,palabraDeRelleno:string) {

        return numero.toString().padStart(cantidadRellenos, palabraDeRelleno);

    }

     generarTarjetaPrimeraVez() {
        this.generarNuevasClavesATarjeta();
        this.poseeTarjeta = true;
    }

     mostrarClavesEnTarjetaVista(listaClaves: Set<string>) {
        this.ListaTokensTarjeta = [];
        this.ListaTokensTarjeta.push(Array.from(listaClaves).slice(0, 10));
        this.ListaTokensTarjeta.push(Array.from(listaClaves).slice(10, 20));
        this.ListaTokensTarjeta.push(Array.from(listaClaves).slice(20, 30));
        this.ListaTokensTarjeta.push(Array.from(listaClaves).slice(30, 41));
    }


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
