import { JwtModule } from '@auth0/angular-jwt';
import { NgxPermissionsModule } from 'ngx-permissions';


 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthguardGuard } from './core/authentication/guard/authguard.guard';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxPermissionsModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: [getHost()],
                blacklistedRoutes: [getHost() + '/' + 'api/Authentication']
            }
        })
    ],
    providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl }, AuthguardGuard],
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
