import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataApi } from '../enums/data-api';
import { UsuarioForLogin } from 'src/app/pages/pages/auth/login/UsuarioForLogin';
import { ApiService } from '../backend/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  helper = new JwtHelperService();
  tokenDecoded: any;

  constructor(
     public httpService: ApiService,
    // public permissionsService: NgxPermissionsService,
    private router: Router,
    // private toastService: ToastService,
  ) { }

  
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

                    // let permisos: Permiso[] = res.valores[1];
                    // console.table(permisos.map(p => p.nombre));
                    // this.permissionsService.loadPermissions(permisos.map(p => p.nombre));

                }
                return res;
            }));

}


  loggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !this.helper.isTokenExpired(token);
  }
    logout() {
        localStorage.removeItem('token');
        window.location.reload();

    }

  setDecodeToken(): void {
    let token = localStorage.getItem("token");
    this.tokenDecoded = this.helper.decodeToken(token);
  }

}
