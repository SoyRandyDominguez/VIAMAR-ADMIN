import { Component, AfterViewInit } from '@angular/core';
@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {
  subtitle: string;
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}
}
