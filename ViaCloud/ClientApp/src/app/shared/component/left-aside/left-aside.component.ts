import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-left-aside',
  templateUrl: './left-aside.component.html',
  styleUrls: ['./left-aside.component.scss']
})
export class LeftAsideComponent implements OnInit {



  @Output() lockNavEmiter = new EventEmitter<boolean>();
  lockNav: boolean = true;

  menu: LeftAsideMenu[] = [
    {
      title: 'Dashboard',
      icon: 'icon-speedometer',
      route: '',
      hasBadge: false,
      numBadge: 2,
      hasSubMenu: true,
      subMenuOpen: false,
      subMenus: [
        {
          title: 'Minimal',
          icon: 'fa fa-circle text-success',
          route: '',
          hasBadge: false,
          numBadge: 2,
          hasSubMenu: true,
          subMenuOpen: true,
          subMenus: []
        },
        {
          title: 'Analytical',
          icon: 'fa fa-circle text-info',
          route: '',
          hasBadge: false,
          numBadge: 2,
          hasSubMenu: true,
          subMenuOpen: true,
          subMenus: []
        }
      ]
    },
    {
      title: 'PL C',
      icon: 'fa fa-calendar',
      route: '/pl-compras',
      hasBadge: false,
      numBadge: 2,
      hasSubMenu: false,
      subMenuOpen: false,
      subMenus: []
    }
  ];



  constructor() { }

  ngOnInit(): void {
  }

  toogleLockNav() {

    this.lockNav = !this.lockNav;
    this.lockNavEmiter.emit(this.lockNav);
  }

  

  toogleLockNavClose() {
    this.lockNavEmiter.emit(false);
  }
}


export class LeftAsideMenu {
  title: string;
  icon: string;
  route: string;
  hasBadge: boolean;
  numBadge: number;
  hasSubMenu: boolean;
  subMenuOpen: boolean;
  subMenus: LeftAsideMenu[]
}