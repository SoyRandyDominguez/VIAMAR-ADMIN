import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/core/sharedComponents/header/header.component';
import { LeftAsideComponent } from 'src/app/core/sharedComponents/left-aside/left-aside.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {



  @ViewChild(HeaderComponent)
  headerComponent: HeaderComponent;

  

  lockNav:boolean = true;
  servicePanel:boolean = false;
  themeSelected: string = 'skin-megna-dark';

  constructor() { 
  }
  servicePanelEvent(val) {
    this.servicePanel = val;
  }

  lockNavEmiterEvent(val){
    console.log(val); 
    this.lockNav = val;
  }

 
  closeServicePanel(){
    this.headerComponent.servicePanel = !this.servicePanel;
    this.headerComponent.servicePanelEmiter.emit(!this.servicePanel);
  }
  ngOnInit(): void {
    
  }



}
