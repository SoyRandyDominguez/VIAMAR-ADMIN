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

    //ngOnInit() {

    //    this.authenticationService.setDecodeToken();

    //    if (this.authenticationService.loggedIn())
    //        this.authenticationService.setPermissions();


    //    var asyncLoadCount = 0;

    //    this.router.events.subscribe(
    //        (event: RouterEvent): void => {

    //            if (event instanceof RouteConfigLoadStart) {

    //                asyncLoadCount++;

    //            } else if (event instanceof RouteConfigLoadEnd) {

    //                asyncLoadCount--;

    //            }

    //            // If there is at least one pending asynchronous config load request,
    //            // then let's show the loading indicator.
    //            // --
    //            // CAUTION: I'm using CSS to include a small delay such that this loading
    //            // indicator won't be seen by people with sufficiently fast connections.
    //            this.isShowingRouteLoadIndicator = !!asyncLoadCount;

    //        }
    //    );

    //}



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
