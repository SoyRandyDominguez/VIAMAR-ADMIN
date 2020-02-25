import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { AuthenticationService } from './core/authentication/service/authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    public isShowingRouteLoadIndicator: boolean;
    loading;

    constructor(
        public router: Router,
        public authenticationService: AuthenticationService,
        public permissionsService: NgxPermissionsService
    ) {
        this.isShowingRouteLoadIndicator = false;
        this.loading = true;
    }

    ngOnInit() {
        this.authenticationService.setDecodeToken();
        if (!this.authenticationService.loggedIn()) {
            this.router.navigate(['/login']);
        } else {
            this.authenticationService.setPermissions();
            console.table(this.authenticationService.tokenDecoded)
        }
    }

    ngAfterViewInit() {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.loading = true;
                }
                else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel
                ) {
                    this.loading = false;
                }
            });
    }

}
