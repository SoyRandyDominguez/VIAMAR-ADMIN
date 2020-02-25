import { Component, OnInit } from '@angular/core';
import { ComboBox } from '../../../../shared/model/ComboBox';
import { SintomaViewModel } from '../../model/SintomaViewModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../../core/http/service/backend.service';
import { ToastService } from '../../../../component/toast/toast.service';
import { AuthenticationService } from '../../../../core/authentication/service/authentication.service';
import { Parametro } from '../../../../core/http/model/Parametro';
import { DataApi } from '../../../../shared/enums/DataApi.enum';
import { Cita } from '../../model/Cita';

@Component({
    selector: 'app-cita-formulario',
    templateUrl: './cita-formulario.component.html',
    styleUrls: ['./cita-formulario.component.css']
})
export class CitaFormularioComponent implements OnInit {

    clientes: ComboBox[] = [];
    vehiculos: ComboBox[] = [];
    citaTipos: ComboBox[] = [];
    servicios: ComboBox[] = [];
    horasDisponibles: ComboBox[] = [];
    Cargando: boolean = false;
    Formulario: FormGroup;
    submitted = false;
    actualizandoCita = false;
    seHaModificadoHora = false;
    btnGuardarCargando = false;

    fechaActual: Date;

    sintomasCategorias: ComboBox[] = [];
    sintomasCita: SintomaViewModel[] = [];

    constructor(
        private route: ActivatedRoute,
        private httpService: BackendService,
        public toastService: ToastService,
        private router: Router,
        private authService: AuthenticationService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.CreateForm();
        this.getClientes();
        this.getSintomasComboBox();
        this.getServicios();
        this.getHoraActual();
        let citaID = Number(this.route.snapshot.paramMap.get('id'));
        citaID > 0 ? this.getCitaByID(citaID) : this.sintomasCita.push(new SintomaViewModel());
    }


    private CreateForm() {

        this.Formulario = this.formBuilder.group({
            id: [0],
            citaTipoID: [2, [Validators.required]],
            sucursalID: [this.authService.tokenDecoded.primarygroupsid],
            usuarioCreadorID: [this.authService.tokenDecoded.nameid],
            clienteID: [null, [Validators.required]],
            fechaRegistro: [null],
            fechaRecepcion: [null],
            fechaCita: [null, [Validators.required]],
            horaCita: [null, [Validators.required]],
            servicioTipoID: [null, [Validators.required]],
            vehiculoID: [null, [Validators.required]],
            usuarioRecibeID: [0],
            observaciones: [''],
            estadoID: [1],
            asesorID: [0],
            kilometraje: [0],
            combustible: [null],
            tagID: [0],
        });

    }

    get f() { return this.Formulario.controls; } // acceder a los controles del formulario para no escribir tanto codigo en el html


    onSubmit() {

        this.submitted = true;
        if (this.Formulario.invalid) {
            return;
        }
        this.guardarCitaySintomas();
    }

    dateTimeChange(valor: any) {
        this.f.horaCita.setValue(null);
        this.getHorasDisponibles();
    }

    guardarCitaySintomas() {
        let metodo: string = this.actualizandoCita ? "UpdateCitaByID" : "CrearCita";

        this.btnGuardarCargando = true;
        let parametros: Parametro[] = [
            { key: "cita", value: this.Formulario.value },
            { key: "sintomas", value: this.sintomasCita },
        ];
        this.httpService.DoPost<Cita>(DataApi.Cita,
            metodo, parametros).subscribe(response => {

                if (!response.ok) {
                    this.toastService.Danger(response.errores[0]);
                } else {
                    this.toastService.Success();
                    this.router.navigateByUrl('/cita');
                }

                this.btnGuardarCargando = false;
            }, error => {
                this.btnGuardarCargando = false;
                this.toastService.MostrarMensajeDeErrorConexionServidor();
            });
    }

    getCitaByID(citaID: number) {
        this.Cargando = true;
        let parametros = [
            { key: "citaID", value: citaID },
        ];

        this.httpService.DoPost<Cita>(DataApi.Cita,
            "GetCitaByCitaID", parametros).subscribe(response => {

                if (!response.ok) {
                    this.toastService.Danger(response.errores[0]);
                } else {
                    //validar que existe
                    if (response != null && response.records != null && response.records.length > 0) {
                        this.Formulario.setValue(response.records[0]);
                        this.getVehiculosByCliente(response.records[0].clienteID);
                        this.getSintomasByCitaID(citaID);
                        this.getHorasDisponibles();
                        this.actualizandoCita = true;
                    } else {
                        this.toastService.Warning("Cita no encontrada");
                        this.router.navigateByUrl('/servicios/citas');
                    }
                }

            }, error => {
                this.Cargando = false;
                this.toastService.MostrarMensajeDeErrorConexionServidor();
            });
    }

    getSintomasComboBox() {
        this.Cargando = true;
        let parametros = [
        ];

        this.httpService.DoPost<ComboBox>(DataApi.ComboBox,
            "GetSintomasComboBox", parametros).subscribe(response => {

                if (!response.ok) {
                    this.toastService.Danger(response.errores[0]);
                } else {
                    this.sintomasCategorias = response.records;
                }

            }, error => {
                this.Cargando = false;
                this.toastService.MostrarMensajeDeErrorConexionServidor();
            });
    }

    getSintomasByCitaID(citaID: number) {
        this.Cargando = true;
        let parametros = [
            { key: "citaID", value: citaID },
        ];

        this.httpService.DoPost<SintomaViewModel>(DataApi.Sintoma,
            "GetSintomasByCitaID", parametros).subscribe(response => {

                if (!response.ok) {
                    this.toastService.Danger(response.errores[0]);
                } else {
                    this.sintomasCita = response.records;
                }

            }, error => {
                this.Cargando = false;
                this.toastService.MostrarMensajeDeErrorConexionServidor();
            });
    }

    getClientes() {
        this.Cargando = true;
        let parametros: Parametro[] = [
            { key: "sucursalID", value: this.authService.tokenDecoded.primarygroupsid }
        ];
        this.httpService.DoPost<ComboBox>(DataApi.ComboBox,
            "GetClientesComboBox", parametros).subscribe(response => {

                if (!response.ok) {
                    this.toastService.Danger(response.errores[0]);
                } else {
                    this.clientes = response.records;
                }

                this.Cargando = false;
            }, error => {
                this.Cargando = false;
                this.toastService.MostrarMensajeDeErrorConexionServidor();
            });
    }

    getVehiculosByCliente(clienteID: number) {
        this.Cargando = true;
        let parametros: Parametro[] = [{ key: "clienteID", value: clienteID }];
        this.httpService.DoPost<ComboBox>(DataApi.ComboBox,
            "GetChasisPorCliente", parametros).subscribe(response => {

                if (!response.ok) {
                    this.toastService.Danger(response.errores[0]);
                } else {
                    this.vehiculos = response.records;
                }

                this.Cargando = false;
            }, error => {
                this.Cargando = false;
                this.toastService.MostrarMensajeDeErrorConexionServidor();
            });
    }

    getServicios() {
        this.Cargando = true;
        let parametros: Parametro[] = [
            { key: "sucursalID", value: this.authService.tokenDecoded.primarygroupsid }
        ];
        this.httpService.DoPost<ComboBox>(DataApi.ComboBox,
            "GetServiciosComboBox", parametros).subscribe(response => {

                if (!response.ok) {
                    this.toastService.Danger(response.errores[0]);
                } else {
                    this.servicios = response.records;
                }

                this.Cargando = false;
            }, error => {
                this.Cargando = false;
                this.toastService.MostrarMensajeDeErrorConexionServidor();
            });
    }

    getHoraActual() {
        this.Cargando = true;
        this.httpService.DoPost<ComboBox>(DataApi.Public,
            "GetHoraActual", null).subscribe(response => {

                if (!response.ok) {
                    this.toastService.Danger(response.errores[0]);
                } else {
                    this.fechaActual = new Date(response.valores[0]);
                    this.fechaActual.setHours(this.fechaActual.getHours() - 24);
                }

                this.Cargando = false;
            }, error => {
                this.Cargando = false;
                this.toastService.MostrarMensajeDeErrorConexionServidor();
            });
    }

    getHorasDisponibles() {
        this.Cargando = true;
        let parametros: Parametro[] = [
            { key: "sucursalID", value: this.authService.tokenDecoded.primarygroupsid },
            { key: "fechaCita", value: this.f.fechaCita.value }];
        this.httpService.DoPost<ComboBox>(DataApi.ComboBox,
            "GetHorasDisponiblesCita", parametros).subscribe(response => {

                if (!response.ok) {
                    this.toastService.Danger(response.errores[0]);
                } else {
                    this.horasDisponibles = response.records;
                }

                this.Cargando = false;
            }, error => {
                this.Cargando = false;
                this.toastService.MostrarMensajeDeErrorConexionServidor();
            });
    }

    onSelectCliente(cliente: ComboBox) {
        this.f.vehiculoID.setValue(null);
        this.vehiculos = [];
        if (cliente != null) {
            this.getVehiculosByCliente(cliente.codigo);
        }
    }

    onClearCliente(cliente: ComboBox) {
        this.f.clienteID.reset();
        this.f.vehiculoID.reset();
    }


    onAddSintoma() {
        this.sintomasCita.push(new SintomaViewModel());
    }

    onDeleteSintoma(index: number) {
        this.sintomasCita.splice(index, 1);
    }





}
