import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit {

  firstDigit: number;
  secondDigit: number;
  thirdDigit: number;
  time: number = 75;
  i: number = 0;


  constructor() { }

  ngOnInit() {
    this.loop3();
    this.loop2();
    this.loop1();
  }

  randomNum() {
    return Math.floor(Math.random() * 9) + 1;
  }

  loop1() {
    setTimeout(() => {
      if (this.i > 100) {
        this.firstDigit = 4;
      } else {
        this.firstDigit = this.randomNum()
        this.i++;
      }
      this.loop1();
    }, this.time);
  }


  loop2() {
    setTimeout(() => {
      if (this.i > 100) {
        this.secondDigit = 0;
      } else {
        this.secondDigit = this.randomNum()
        this.i++;
      }
      this.loop2();
    }, this.time);
  }


  loop3() {
    setTimeout(() => {
      if (this.i > 100) {
        this.thirdDigit = 4;
      } else {
        this.thirdDigit = this.randomNum()
        this.i++;
      }
      this.loop3();
    }, this.time);
  }

}
