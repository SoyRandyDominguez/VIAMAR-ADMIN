import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() lockNavEmiter = new EventEmitter<boolean>();

  @Output() servicePanelEmiter = new EventEmitter<boolean>();
  servicePanel:boolean = false;
  lockNav = true;
  constructor() { }

  ngOnInit(): void {

  }


  toogleServicePanel(){
    this.servicePanel = !this.servicePanel;
    this.servicePanelEmiter.emit(this.servicePanel);
  }

  toogleLockNav(){
    this.lockNavEmiter.emit(true);
  }

}
