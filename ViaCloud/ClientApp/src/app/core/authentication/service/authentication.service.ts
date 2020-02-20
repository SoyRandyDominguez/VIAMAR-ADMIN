import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { BackendService, DataApi } from '../../http/service/backend.service';
import { UsuarioForLogin } from '../model/UsuarioForLogin';
import { map } from 'rxjs/operators';
import { Permiso } from '../model/Permiso';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    helper = new JwtHelperService();
    tokenDecoded: any;

    constructor(public httpService: BackendService,
        public permissionsService: NgxPermissionsService,
        private router: Router,
        //private toastService: ToastService,
    ) {
    }

    loggedIn(): boolean {
        const token = localStorage.getItem("token");
        return !this.helper.isTokenExpired(token);
    }

    setDecodeToken(): void {
        let token = localStorage.getItem("token");
        this.tokenDecoded = this.helper.decodeToken(token);
    }


    login(usuario: UsuarioForLogin) {

        return this.httpService.DoPostAny<UsuarioForLogin>(DataApi.Authentication,
            "Login", usuario)
            .pipe(
                map(res => {
                    // login successful if there's a jwt token in the response  && user.token
                    if (res.ok) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes

                        let token = res.valores[0];
                        localStorage.setItem("token", token);
                        this.setDecodeToken();
                        console.log(this.tokenDecoded)
                        let permisos: Permiso[] = res.valores[1];
                        console.table(permisos.map(p => p.nombre));
                        this.permissionsService.loadPermissions(permisos.map(p => p.nombre));

                    }
                    return res;
                }));

    }


    logout(): void {
        // remove user from local storage to log user out
        //this.permissionsService.flushPermissions();
        localStorage.removeItem('token');
        window.location.reload();
    }

    setPermissions(): void {
        console.log(Number(this.tokenDecoded.nameid))
        this.httpService.DoPostAny<any>(DataApi.Usuario, "GetPermisosUsuario", { "Id": Number(this.tokenDecoded.nameid) })
            .subscribe(res => {

                if (res.ok) {
                    let permisos: Permiso[] = res.valores[0];
                    console.table(permisos.map(p => p.nombre));
                    this.permissionsService.loadPermissions(permisos.map(p => p.nombre));
                } else {
                    //this.toastService.Danger("Error interno! Mensaje: " + res.errores[0]);
                    console.error(res.errores);
                    this.logout();
                }

            }, error => {
                console.error(error);
                this.logout();
            });
    }


}
