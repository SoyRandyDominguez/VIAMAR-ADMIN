import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserAuthModel } from '../../Models/Auth/user-auth-model';
import { DataApi, BaseService } from '../HTTPClient/base.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<UserAuthModel>;
  public currentUser: Observable<UserAuthModel>;

  constructor(public http: HttpClient, public service: BaseService, public permissionsService: NgxPermissionsService) {
    this.currentUserSubject = new BehaviorSubject<UserAuthModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserAuthModel {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {

    return this.service.DoPost<UserAuthModel>(DataApi.AuthUser,
      "GetUserAuth", { "Username": username, "Clave": password })
      .pipe(map(res => {
        // login successful if there's a jwt token in the response  && user.token
        if (res.ok) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          let Perms = [];
          res.records[0].permisos.forEach(x => { Perms.push(x.permisoNombre); });
          this.permissionsService.loadPermissions(Perms);
          res.records[0].permisos = [];
          localStorage.setItem('currentUser', JSON.stringify(res.records[0]));
          this.currentUserSubject.next(res.records[0]);
         


        }
        return res;
      }));

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    window.location.reload();
  }
}
