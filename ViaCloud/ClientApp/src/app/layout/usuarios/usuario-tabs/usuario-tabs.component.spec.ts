import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTabsComponent } from './usuario-tabs.component';

describe('UsuarioTabsComponent', () => {
  let component: UsuarioTabsComponent;
  let fixture: ComponentFixture<UsuarioTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
