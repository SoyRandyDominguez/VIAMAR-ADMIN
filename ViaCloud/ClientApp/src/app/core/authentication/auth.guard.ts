

import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        public authenticationService: AuthenticationService,
        // public permissionsService: NgxPermissionsService,
    ) {}

    canActivate(

        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

​

        if (this.authenticationService.loggedIn()) {
            return true;
        }

        this.router.navigate(["/login"]);
        return false;
    }
    canActivateChild(

        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authenticationService.loggedIn()) {
            return true;
        }
        this.router.navigate(["/login"]);
        return false;
    }
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authenticationService.loggedIn()) {
            return true;
        }
        this.router.navigate(["/login"]);
        return false;
    }
}

