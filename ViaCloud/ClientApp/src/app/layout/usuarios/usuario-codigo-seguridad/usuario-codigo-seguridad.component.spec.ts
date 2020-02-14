import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCodigoSeguridadComponent } from './usuario-codigo-seguridad.component';

describe('UsuarioCodigoSeguridadComponent', () => {
  let component: UsuarioCodigoSeguridadComponent;
  let fixture: ComponentFixture<UsuarioCodigoSeguridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioCodigoSeguridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCodigoSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
