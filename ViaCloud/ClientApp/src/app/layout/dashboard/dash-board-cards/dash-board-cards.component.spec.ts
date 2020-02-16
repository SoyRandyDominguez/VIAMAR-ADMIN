import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardCardsComponent } from './dash-board-cards.component';

describe('DashBoardCardsComponent', () => {
  let component: DashBoardCardsComponent;
  let fixture: ComponentFixture<DashBoardCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
