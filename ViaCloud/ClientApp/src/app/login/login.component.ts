import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService, } from '../Services/Authentication/autenticacion.service';
import { BaseService, DataApi } from '../Services/HTTPClient/base.service';
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
    error: string = null;
    selectedSucursal: ComboBox = null;

    sucursales: ComboBox[] = null
    usuario: UsuarioForLogin = null
    estilo1 = null;
    estilo2 = null;
    mostrarLogin = true;


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
        this.mostrarLogin = true;
        this.selectedSucursal = null;
        this.error = null;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            Username: ['', Validators.required],
            Clave: ['', Validators.required]
        });


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
                this.loading = false;
                return;
            }

            this.sucursales = response.records;
            this.girarLogin();
            this.loading = false;

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
                    this.error = response.errores[0];
                    this.loading = false;
                    return;
                }

                this.router.navigateByUrl("/home");
                this.loading = false;
            }, error => {
                this.toastService.Danger("Error interno! Mensaje: " + error);
                console.log(error)
                this.error = error;
                this.loading = false;
            });
        }

    }

    girarLogin() {

        this.estilo1 = { 'transform': 'rotateY(-180deg)' };
        this.estilo2 = { 'transform': 'rotateY(0deg)' };
        this.mostrarLogin = false;
        this.error = null;
    }


}



