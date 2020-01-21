import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRiferosComponent } from './usuarios-riferos.component';

describe('UsuariosRiferosComponent', () => {
  let component: UsuariosRiferosComponent;
  let fixture: ComponentFixture<UsuariosRiferosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosRiferosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosRiferosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
