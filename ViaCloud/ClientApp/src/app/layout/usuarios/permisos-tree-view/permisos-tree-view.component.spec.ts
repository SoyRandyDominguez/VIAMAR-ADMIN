import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosTreeViewComponent } from './permisos-tree-view.component';

describe('PermisosTreeViewComponent', () => {
  let component: PermisosTreeViewComponent;
  let fixture: ComponentFixture<PermisosTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
