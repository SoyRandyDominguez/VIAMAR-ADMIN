import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../../core/authentication/service/authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { BackendService, DataApi } from '../../../../core/http/service/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ComboBox } from '../../../../shared/model/ComboBox';
import { UsuarioForLogin } from '../../../../core/authentication/model/UsuarioForLogin';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

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
        public httpService: BackendService,
        public permissionsService: NgxPermissionsService,
        //public toastService: ToastService,
        public authenticationService: AuthenticationService
    ) {
    }

    ngOnInit(): void {

        this.loginForm = this.formBuilder.group({
            Username: ['', Validators.required],
            Clave: ['', Validators.required]
        });


        if (this.authenticationService.loggedIn()) {
            this.router.navigate(['/']);
        }



    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }


    onSubmit() {

        this.submitted = true;
        //stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.Login();
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
            //this.toastService.Danger("Error interno! Mensaje: " + error);
            this.error = error;
            this.loading = false;
        });

    }


    Login() {
        this.loading = true;

        //if (this.selectedSucursal) {

        //this.usuario.sucursalID = this.selectedSucursal.codigo;

        this.usuario = {
            usuario: this.f.Username.value,
            password: this.f.Clave.value,
            sucursalID: 0
        };


        this.usuario.sucursalID = 1;

        this.authenticationService.login(this.usuario).subscribe(response => {

            if (!response || !response.ok) {
                //this.toastService.Danger(response.errores[0]);
                console.error(response.errores[0]);
                this.error = response.errores[0];
                this.loading = false;
                return;
            }

            this.router.navigateByUrl("/inicio");
            this.loading = false;
        }, error => {
            //this.toastService.Danger("Error interno! Mensaje: " + error);
            console.log(error)
            this.error = error;
            this.loading = false;
        });
        //}

    }



    girarLogin() {

        this.estilo1 = { 'transform': 'rotateY(-180deg)' };
        this.estilo2 = { 'transform': 'rotateY(0deg)' };
        this.mostrarLogin = false;
        this.error = null;
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
}
