import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioTabsComponent } from './usuario-tabs/usuario-tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';
import { UsuariosRiferosComponent } from './usuarios-riferos/usuarios-riferos.component';
import { UsuarioListadoComponent } from './usuario-listado/usuario-listado.component';
import { UsuarioCodigoSeguridadComponent } from './usuario-codigo-seguridad/usuario-codigo-seguridad.component';
import { TarjetaDetalleComponent } from './Tarjeta/tarjeta-detalle/tarjeta-detalle.component';
import { TarjetaUsuariosFlujoComponent } from './Tarjeta/tarjeta-usuarios-flujo/tarjeta-usuarios-flujo.component';
import { PermisosTreeViewComponent } from './permisos-tree-view/permisos-tree-view.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [UsuariosComponent, UsuarioTabsComponent, UsuarioFormularioComponent,
    UsuariosRiferosComponent, UsuarioListadoComponent, UsuarioCodigoSeguridadComponent,
    TarjetaDetalleComponent, TarjetaUsuariosFlujoComponent, PermisosTreeViewComponent,
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
