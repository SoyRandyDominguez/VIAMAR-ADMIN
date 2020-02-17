import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataApi, BaseService } from '../HTTPClient/base.service';
import { NgxPermissionsService } from 'ngx-permissions';


import { JwtHelperService } from "@auth0/angular-jwt";
import { UsuarioForLogin } from '../../Models/Usuarios/UsuarioForLogin';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    helper = new JwtHelperService();
    tokenDecoded: any;

    constructor(public service: BaseService, public permissionsService: NgxPermissionsService, private router: Router) {
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

        return this.service.DoPostAny<UsuarioForLogin>(DataApi.Authentication,
            "Login", usuario)
            .pipe(
                map(res => {
                    // login successful if there's a jwt token in the response  && user.token
                    if (res.ok) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes

                        let token = res.valores[0];
                        localStorage.setItem("token", token);
                        this.setDecodeToken();

                        //let Perms = [];
                        //res.records[0].permisos.forEach(x => { Perms.push(x.permisoNombre); });
                        //this.permissionsService.loadPermissions(Perms);

                        //res.records[0].permisos = [];
                        //localStorage.setItem('currentUser', JSON.stringify(res.records[0]));
                        //this.currentUserSubject.next(res.records[0]);
                    }
                    return res;
                }));

    }

    logout(): void {
        // remove user from local storage to log user out
        this.permissionsService.flushPermissions();
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
    }
}
