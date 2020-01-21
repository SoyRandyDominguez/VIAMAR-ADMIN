import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService } from '../../../Services/Authentication/autenticacion.service';
import { Usuarios } from '../../../Models/Usuarios/usuarios';
import { DataApi, BaseService } from '../../../Services/HTTPClient/base.service';
import { UserAuthModel } from '../../../Models/Auth/user-auth-model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  

    currentUser: UserAuthModel = null;
    BalanceUsuario: number = 0;
    MostrarBalance: boolean = false;
    MenuClose: boolean = false;
    constructor(
    public base: BaseService,
    public router: Router,
    public  permissionsService: NgxPermissionsService,
     public authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
   
    }



    ngOnInit() {
        this.getBalanceUsuario();
  }


   toogleMenu() {
    this.MenuClose = !this.MenuClose;
    }


    getBalanceUsuario() {
 

        this.base.DoPost<Usuarios>(DataApi.MUsuario, "GetBalanceUsuarios", { "@UsuarioID": this.currentUser.id }).subscribe(x => {
            //console.log(x.valores);
            let Balance = x.valores[0];
            if (x.ok && x.valores.length > 0) {
                this.BalanceUsuario = Balance.BalanceActual;
                this.MostrarBalance = true;
                //console.log(Balance.BalanceActual);

            } else {
                this.BalanceUsuario = 0;
                this.MostrarBalance = false;
            }

        }, error => {

        });
    }

  logout() {

    this.authenticationService.logout();

  }


}
