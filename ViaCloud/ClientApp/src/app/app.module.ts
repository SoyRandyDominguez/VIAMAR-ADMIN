import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';   
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastComponent } from './Components/toast/toast.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({

  declarations: [
    AppComponent,  
    ToastComponent, 
  ],
  imports: [ 
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    NgbModule,
    DragDropModule
  ],

  providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl }], 

  bootstrap: [AppComponent]

})
export class AppModule { }  
  
 
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
