import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/authentication/service/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']

})
export class AppComponent {
    constructor(
        public router: Router,
        public authenticationService: AuthenticationService,
        //public permissionsService: NgxPermissionsService
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


