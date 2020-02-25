import * as $ from 'jquery';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxPermissionsModule } from 'ngx-permissions';

  
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';   
import { HttpClientModule } from '@angular/common/http';  
import { Routes, RouterModule } from '@angular/router';  
 
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap'; 
 
import { FullComponent } from './core/layouts/full/full.component';
import { BlankComponent } from './core/layouts/blank/blank.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './Modules/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from './Modules/shared/shared.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
};

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        FullComponent,
        BlankComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        LoginComponent
    ],
    imports: [ 
        JwtModule.forRoot({
            config: { 
                tokenGetter: tokenGetter, 
                whitelistedDomains: [getHost()],
                blacklistedRoutes: [getHost() + '/' + 'api/Authentication']
            }
        }),
        NgbModule,
        NgxPermissionsModule.forRoot(),
        PerfectScrollbarModule,
        NgbToastModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forRoot(Approutes),

    ],
    providers: [
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
        { provide: 'BASE_URL', useFactory: getBaseUrl }, AuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

export function getHost() {
    return window.location.host;
}

export function tokenGetter() {
    return localStorage.getItem("token");
}
