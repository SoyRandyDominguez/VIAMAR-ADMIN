import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService } from './Services/Authentication/autenticacion.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    //currentUser: UserAuthModel;

    constructor(
        public router: Router,
        public authenticationService: AuthenticationService,
        public permissionsService: NgxPermissionsService
    ) {

        //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }


    ngOnInit() {
        this.authenticationService.setDecodeToken();  
        if (!this.authenticationService.loggedIn()) {
            this.router.navigate(['/login']);
        } else {
            this.authenticationService.setPermissions();
        }
    }


}
