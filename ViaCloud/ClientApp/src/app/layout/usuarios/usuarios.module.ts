import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioCodigoSeguridadComponent } from './usuario-codigo-seguridad/usuario-codigo-seguridad.component';
import { PermisosTreeViewComponent } from './permisos-tree-view/permisos-tree-view.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [UsuariosComponent,  UsuarioCodigoSeguridadComponent,  PermisosTreeViewComponent,
    PerfilUsuarioComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    FormsModule, NgSelectModule,
    NgbModule, TreeViewModule
  ]
})
export class UsuariosModule { }
