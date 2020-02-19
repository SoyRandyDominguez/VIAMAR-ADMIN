import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService } from '../../../Services/Authentication/autenticacion.service';
import { DataApi, BaseService } from '../../../Services/HTTPClient/base.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  

    currentUser: any = null;
    BalanceUsuario: number = 0;
    MostrarBalance: boolean = false;
    MenuClose: boolean = false;
    constructor(
    public base: BaseService,
    public router: Router,
    public  permissionsService: NgxPermissionsService,
     public authenticationService: AuthenticationService
  ) {
    //this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
   
    }



    ngOnInit() {
  }


   toogleMenu() {
    this.MenuClose = !this.MenuClose;
    }




  logout() {

    this.authenticationService.logout();

  }


}
