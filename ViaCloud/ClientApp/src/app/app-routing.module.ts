//~Paso 1  importar el componente que va a routear
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from './Services/Authentication/auth-guard.guard';
const AllPermissions =
  [
    'Admin',
    'Receptor',
    'Citas',
    'RegistrarCita'
  ]



const routes: Routes = [


  {
    path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    //canActivate: [AuthGuard]
  },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  { path: 'error404', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
  { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  //{ path: '**', redirectTo: 'error404' },






  //{
  //  path: '',
  //  component: HomeComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: AllPermissions,
  //      redirectTo: '/login'
  //    }
  //  }
  //},

  //{
  //  path: 'configuraciones-sorteo',
  //  loadChildren: './Components/configuracion-sorteos/configuracion-sorteos.module',
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: AllPermissions,
  //      redirectTo: '/login'
  //    }
  //  }
  //},
  //{
  //  path: 'login',
  //  component: LoginComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      except: AllPermissions,
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'home',
  //  component: HomeComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: AllPermissions,
  //      redirectTo: '/login'
  //    }
  //  }
  //},
  //{
  //  path: 'dashboard',
  //  component: DashboardComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'usuarios',
  //  component: UsuarioListadoComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'CrearUsuarios', 'EditarUsuarios', 'EliminarUsuarios'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'usuarios/:id',
  //  component: UsuarioTabsComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'CrearUsuarios', 'EditarUsuarios'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'dashboard',
  //  component: DashboardComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'limites',
  //  component: LimitesComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'controles',
  //  component: ControlesNumerosComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'limites-sorteo',
  //  component: LimitesGlobalesComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'zonas',
  //  component: ZonaListadoComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'Zonas', 'CrearZonas', 'EditarZonas', 'EliminarZonas'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},

  //{
  //  path: 'riferos',
  //  component: RiferoListadoComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'CrearRiferos', 'EditarRiferos', 'EliminarRiferos', 'BalanceRifero'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  ////{
  ////  path: 'esquemas',
  ////  component: GrupoEsquemaPagoListadoComponent
  ////},
  //{
  //  path: 'esquemas/:id',
  //  component: BancaEsquemaPagoComponent
  //},
  //{
  //  path: 'cuentas',
  //  component: CuentaListadoComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'Cuentas'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'cuentas/:id',
  //  component: CuentaFormularioComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'Cuentas'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'configuraciones',
  //  component: ConfiguracionesComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'Configuraciones', 'Configuraciones Generales'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'riferos/:id',
  //  component: RiferoFormularioComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'CrearRiferos', 'EditarRiferos', 'BalanceRifero'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'bancas',
  //  component: BancaListadoComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'EditarBancas', 'MensajeGeneral', 'MensajeDirecto'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'bancas/:id',
  //  component: BancaTabsComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'EditarBancas'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'configuraciones',
  //  component: ConfiguracionesComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'ConfiguracionesGenerales', 'EsquemasPrecios'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},


  //{
  //  path: 'sorteos',
  //  component: SorteoDetalleComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'CerrarVentas', 'GuardarPremios', 'CorregirPremios', 'ReiniciarVentas', 'NoLaborable'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'perfil',
  //  component: PerfilUsuarioComponent
  //},
  //{
  //  path: 'flujo/movimientos',
  //  component: FlujoMovimientosComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'Movimientos'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'flujo/movimientos/registrar',
  //  component: RegistrarMovimientoComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'Movimientos'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'flujo/ingresos-gastos',
  //  component: FlujoIngresosGastosComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'Ingresos y gastos'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'flujo/ingresos-gastos/registrar',
  //  component: IngresosGastosFormularioComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'Ingresos y gastos'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},
  //{
  //  path: 'flujo/tarjetas-usuarios',
  //  component: TarjetaUsuariosFlujoComponent
  //},
  //{
  //  path: 'flujo/tarjetas-usuarios/tarjeta/:id',
  //  component: TarjetaDetalleComponent
  //},
  //{
  //  path: 'alertas',
  //  component: AlertasComponent,
  //  canActivate: [NgxPermissionsGuard],
  //  data: {
  //    permissions: {
  //      only: ['Admin', 'Alertas'],
  //      redirectTo: '/home'
  //    }
  //  }
  //},

  //este siempre debe ir de ultimo
];
//no tocar

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


