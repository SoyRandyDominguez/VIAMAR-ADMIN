import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService, } from '../Services/Authentication/autenticacion.service';
import { BaseService, DataApi } from '../Services/HTTPClient/base.service';
import { first } from 'rxjs/operators';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';
import { ToastService } from '../Services/Common/toast.service';
import { ComboBox } from '../Models/Common/ComboBox';
import { UsuarioForLogin } from '../Models/Usuarios/UsuarioForLogin';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        // animation triggers go here
    ]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    selectedSucursal: ComboBox = null;

    sucursales: ComboBox[] = null
    usuario: UsuarioForLogin = null

    //sucursales: ComboBox[] = [
    //  { codigo: 1, nombre: 'SERVICIOS MOVIL NO. 1', grupo: 'VIAMAR, S.A.', grupoID: '1' },
    //  { codigo: 2, nombre: 'JAGUAR DOMINICANA', grupo: 'VIAMAR, S.A.', grupoID: '1' },
    //  { codigo: 3, nombre: 'QUICK LANE HIGUEY', grupo: 'VIAMAR, S.A.', grupoID: '1' },
    //  { codigo: 4, nombre: 'QUICK PARTS/MARMOLERA', grupo: 'VIAMAR, S.A.', grupoID: '1' },
    //  { codigo: 5, nombre: 'OPORTUNITY CARS', grupo: 'VIAMAR, S.A.', grupoID: '1' },
    //  { codigo: 6, nombre: 'NEGOCIOS DIVERSOS (PRINCIPAL)', grupo: 'VIAMAR, S.A.', grupoID: '1' },


    //  { codigo: 37, nombre: 'ECO MOTORS (PRINCIPAL)', grupo: 'ECO MOTORS S.A.S.', grupoID: '13' },
    //  { codigo: 38, nombre: 'ECOMOTORS  (HIGUEY)', grupo: 'ECO MOTORS S.A.S.', grupoID: '13' },
    //  { codigo: 39, nombre: 'NEGOCIOS DIVERSOS 27 FEB.', grupo: 'ECO MOTORS S.A.S.', grupoID: '13' },
    //  { codigo: 40, nombre: 'ECOMOTORS  (SANTIAGO EST.)', grupo: 'ECO MOTORS S.A.S.', grupoID: '13' },
    //  { codigo: 41, nombre: 'ECOMOTORS  (SANTIAGO DUARTE)', grupo: 'ECO MOTORS S.A.S.', grupoID: '13' },



    //  { codigo: 26, nombre: 'QUIEREME COMO SOY', grupo: 'QUIEREME COMO SOY', grupoID: '5' },

    //  { codigo: 27, nombre: 'FERALCO (MAXIMO GOMEZ)', grupo: 'FERALCO', grupoID: '6' },

    //  { codigo: 29, nombre: 'QUICK LANE/QUICK PARTS SAN FCO', grupo: 'AUTOMARE', grupoID: '8' },
    //]


    estilo1 = null;
    estilo2 = null;
    constructor(
        public formBuilder: FormBuilder,
        public route: ActivatedRoute,
        public router: Router,
        public httpService: BaseService,
        public permissionsService: NgxPermissionsService,
        public toastService: ToastService,
        public authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (authenticationService.loggedIn()) {
            this.router.navigate(['/']);
        }
    }

    cancelar() {
        this.estilo1 = null;
        this.estilo2 = null;
        this.loginForm.reset();
        this.submitted = false;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            Username: ['', Validators.required],
            Clave: ['', Validators.required]
        });


        this.loginForm.valueChanges.subscribe(x => { this.error = x; });
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {

        this.submitted = true;
        //stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.validateUser();
    }

    validateUser() {

        this.loading = true;

        this.usuario = {
            usuario: this.f.Username.value,
            password: this.f.Clave.value,
            sucursalID: 0
        };

        this.httpService.DoPostAny<ComboBox>(DataApi.Authentication, "ValidateUser", this.usuario).subscribe(response => {

            if (!response || !response.ok) {
                this.error = response.errores[0];
                console.error(this.error)
                return;
            }

            this.sucursales = response.records;
            this.girarLogin();

        }, error => {
            this.toastService.Danger("Error interno! Mensaje: " + error);
            this.error = error;
            this.loading = false;
        });

    }


    Entrar() {
        this.loading = true;

        if (this.selectedSucursal) {

            this.usuario.sucursalID = this.selectedSucursal.codigo;

            this.authenticationService.login(this.usuario).subscribe(response => {

                if (!response || !response.ok) {
                    this.toastService.Danger(response.errores[0]);
                    return;
                }

                this.router.navigateByUrl("/home");

            }, error => {
                this.toastService.Danger("Error interno! Mensaje: " + error);
                this.error = error;
                this.loading = false;
            });
        }

    }

    girarLogin() {

        this.estilo1 = { 'transform': 'rotateY(-180deg)' };
        this.estilo2 = { 'transform': 'rotateY(0deg)' };
    }


}



