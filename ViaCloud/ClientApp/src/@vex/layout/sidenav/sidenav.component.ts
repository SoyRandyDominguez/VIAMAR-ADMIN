import { Component, Input, OnInit } from '@angular/core';
import { trackByRoute } from '../../utils/track-by';
import { NavigationService } from '../../services/navigation.service';
import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';
import { LayoutService } from '../../services/layout.service';
import { ConfigService } from '../../services/config.service';
import { map } from 'rxjs/operators';


import icLayers from '@iconify/icons-ic/twotone-layers';
import icPR from '@iconify/icons-ic/outline-calendar-today';
import icSettings from '@iconify/icons-ic/twotone-settings';

@Component({
  selector: 'vex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() collapsed: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.imageUrl));
  showCollapsePin$ = this.configService.config$.pipe(map(config => config.sidenav.showCollapsePin));

  // items = this.navigationService.items;
  items=[];
  trackByRoute = trackByRoute;
  icRadioButtonChecked = icRadioButtonChecked;
  icRadioButtonUnchecked = icRadioButtonUnchecked;

  constructor(private navigationService: NavigationService,
              private layoutService: LayoutService,
              private configService: ConfigService) { }




formatMenuItems(){


}




  ngOnInit() {

    let listaTest = [
      {id:1,type:'link',	label:'Dashboard',route:'/dashboards/analytics',	
      activo:true,isSubMenu:false,	parentID:null,children:[],icon: icLayers},
      
      {id:2,type:'dropdown',	label:'PR',route:	null,
        activo:true,	isSubMenu:false, parentID:null,children:[],icon: icPR},
        
      {id:3,type:'link',label:'PL C',route:'/modulos/pl-compras',	
      activo:true, isSubMenu:true, parentID:2,children:[],icon: null}
    ]

    // var review = ['a', 'b', 'c', 'b', 'a'];

    listaTest.forEach(function(item, index, object) {

      // item.icon = JSON.parse(item.icon);


      item.children = listaTest.filter(z=>z.parentID==item.id);
          if (item.isSubMenu) {
            object.splice(index, 1);
          }
        });
        // console.table(listaTest);
        // console.table(listaTest.filter(x=>x.parentID != null));


this.items = listaTest;

// this.items = [
//       {
//         type: 'link',
//         label: 'Dashboard',
//         route: '/dashboards/analytics',
//         icon: icLayers
//       },
//       {
//         type: 'dropdown',
//         label: 'PR',
//         icon: icPR,
        
//         children:[
//           {
//             type: 'link',
//             label: 'PL C',
//             route: '/modulos/pl-compras',
//             icon: icPR
//           },
//         ]

//       },
      
//       {
//         type: 'subheading',
//         label: 'Customize',
//         children: []
//       },
//       {
//         type: 'link',
//         label: 'Configuration',
//         route: () => this.layoutService.openConfigpanel(),
//         icon: icSettings
//       }
//     ];




  }

  onMouseEnter() {
    this.layoutService.collapseOpenSidenav();
  }

  onMouseLeave() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }
}

// export class formatMenuItem{
//   id:number;
//   type:

// }

// {id:1,type:'link',	label:'Dashboard',route:'/dashboards/analytics',	activo:true,	parentID:null,children:[]},
      