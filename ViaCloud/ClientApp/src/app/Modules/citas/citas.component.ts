import { Component, AfterViewInit } from '@angular/core';
@Component({
  templateUrl: './citas.component.html'
})
export class CitasComponent implements AfterViewInit {
  subtitle: string;
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}
}
