import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-dash-board-cards',
  templateUrl: './dash-board-cards.component.html',
  styleUrls: ['./dash-board-cards.component.scss']
})
export class DashBoardCardsComponent implements OnInit {

  constructor() { }

  @Input() items: any[] = [];

  ngOnInit() {
    //let item = new DashBoardCardsModel;
    //item.borderColorClass = "border-left-primary";
    //item.titleColorClass = "text-gray-800";
    //item.title = "Prueba 1";
    //item.value = "150.26";
    //item.iconName = "fa-calendar-week";
    //item.iconColorClass = "text-primary";
    //this.items.push(item);
  }
  
}
