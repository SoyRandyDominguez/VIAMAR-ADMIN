import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ComboBox } from '../../shared/model/ComboBox';
import { AuthenticationService } from '../../core/authentication/service/authentication.service';
import { BackendService } from '../../core/http/service/backend.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioForLogin } from './model/UsuarioForLogin.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: []
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
        public httpService: BackendService,
        //public permissionsService: NgxPermissionsService,
        //public toastService: ToastService,
        public authenticationService: AuthenticationService
    ) {
    }

    ngOnInit(): void {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
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



    Login() {
        this.submitted = true;

        if (this.loginForm.invalid)
            return;


        this.usuario = {
            usuario: this.f.username.value,
            password: this.f.password.value,
            sucursalID: 0
        };


        this.loading = true;
        this.authenticationService.login(this.usuario).subscribe(response => {

            if (!response || !response.ok) {
                console.error(response.errores[0]);
                this.error = response.errores[0];
                this.loading = false;
                return;
            }

            this.router.navigateByUrl("/home");
            this.loading = false;
        }, error => {
            console.log(error)
            this.error = error;
            this.loading = false;
        });

    }

    //cancelar() {
    //    this.estilo1 = null;
    //    this.estilo2 = null;
    //    this.loginForm.reset();
    //    this.submitted = false;
    //    this.mostrarLogin = true;
    //    this.selectedSucursal = null;
    //    this.error = null;
    //}

    //validateUser() {

    //    this.loading = true;

    //    this.usuario = {
    //        usuario: this.f.username.value,
    //        password: this.f.password.value,
    //        sucursalID: 0
    //    };

    //    this.httpService.DoPostAny<ComboBox>(DataApi.Authentication, "ValidateUser", this.usuario).subscribe(response => {

    //        if (!response || !response.ok) {
    //            this.error = response.errores[0];
    //            this.loading = false;
    //            return;
    //        }

    //        this.sucursales = response.records;
    //        //this.girarLogin();
    //        this.loading = false;

    //    }, error => {
    //        //this.toastService.Danger("Error interno! Mensaje: " + error);
    //        console.error(error);
    //        this.loading = false;
    //    });

    //}



}
