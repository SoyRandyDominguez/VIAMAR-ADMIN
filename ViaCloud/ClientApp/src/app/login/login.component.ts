import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserAuthModel } from '../Models/Auth/user-auth-model';
import { AuthenticationService, } from '../Services/Authentication/autenticacion.service';
import { BaseService, DataApi } from '../Services/HTTPClient/base.service';
import { LibrariesService } from '../Services/Common/libraries-service.service';
import { first } from 'rxjs/operators';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';


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
        public service: BaseService,
        public permissionsService: NgxPermissionsService,
        public library: LibrariesService,
        public authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
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

        this.service.DoPostAny(DataApi.Authentication, "Registrar", {}).subscribe(response => {
            console.log(response);
        }, error => {
            console.log(error);
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

        this.loading = true;
        this.authenticationService.login(this.f.Username.value, this.f.Clave.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.ok && data.records[0].token) {
                        this.loading = false;

                        this.sucursales = data.valores[0];

                        if (this.sucursales.length > 0) {
                            this.estilo1 = { 'transform': 'rotateY(-180deg)' };
                            this.estilo2 = { 'transform': 'rotateY(0deg)' };
                        }

                    } else {

                        this.loading = false;
                        this.loginForm.reset();
                        this.submitted = false;

                        this.library.showToast(data.errores[0].toString(), { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
                        //this.router.navigateByUrl("/login");
                    }
                },
                error => {
                    this.library.showToast("Error interno! Mensaje: " + error, { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
                    this.error = error;
                    this.loading = false;
                });
    }



    Entrar() {
        this.loading = true;
        if (this.selectedSucursal != null) {


            let currentUser: UserAuthModel = JSON.parse(localStorage.getItem('currentUser'));
            console.log(currentUser);
            console.log(this.selectedSucursal);
            currentUser.sucursalID = this.selectedSucursal.codigo;
            currentUser.companiaID = Number(this.selectedSucursal.grupoID);
            console.log(currentUser);

            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            this.router.navigateByUrl("/home");

        }



        this.loading = false;







    }



}


export class ComboBox {

    codigo: number;
    nombre: string;
    grupo: string
    grupoID: string;


}
