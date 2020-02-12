import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthModel } from '../../Models/Auth/user-auth-model';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  currentUser: UserAuthModel;
  MenuClose: boolean = false;
  


  constructor(
    public router: Router,
    public permissionsService: NgxPermissionsService
  ) { }


  ngOnInit() {
    console.log(this.permissionsService.getPermissions());
  }


  toogleMenu() {
    this.MenuClose = !this.MenuClose;
  }




}
