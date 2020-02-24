import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icLoading from '@iconify/icons-fa-solid/spinner'
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UsuarioForLogin } from './UsuarioForLogin';

@Component({
    selector: 'vex-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        fadeInUp400ms
    ]
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    inputType = 'password';
    visible = false;
    error: string;

    icVisibility = icVisibility;
    icVisibilityOff = icVisibilityOff;
    icLoading = icLoading;

    constructor(private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private snackbar: MatSnackBar,
        private authService: AuthenticationService
    ) { }

  
    ngOnInit() {


        if (this.authService.loggedIn()) {
            this.router.navigate(['/']);
        }

        this.form = this.fb.group({
            usuario: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public get f() {
        return this.form.controls;
    }


    send() {

        if (this.form.invalid) {
            return false;
        }

        let usuario: UsuarioForLogin = {
            usuario: this.f.usuario.value,
            password: this.f.password.value,
            sucursalID: 1
        }

        this.authService.login(usuario).subscribe(x => {
            if (x.ok) {
                this.router.navigate(['/']);
                this.snackbar.open('Bienvenido a VEX ' + usuario.usuario, 'OK', {
                    duration: 10000
                });
            } else {
                this.error = x.errores[0];
            }

        });




    }

    toggleVisibility() {
        if (this.visible) {
            this.inputType = 'password';
            this.visible = false;
            this.cd.markForCheck();
        } else {
            this.inputType = 'text';
            this.visible = true;
            this.cd.markForCheck();
        }
    }
}
