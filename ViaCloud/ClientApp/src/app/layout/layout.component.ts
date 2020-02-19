import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  currentUser: any = null;

  AllPermissions =
    [
      'Admin',
      'Punto de venta',
      'Numeros',
      'Recargas',
      'Central',
      'Banca',
      'EditarBancas',
      'MensajeGeneral',
      'MensajeDirecto',
      'Esquemas',
      'EditarConfiguraciones',
      'CrearLLave',
      'Riferos',
      'CrearRiferos',
      'EliminarRiferos',
      'EditarRiferos',
      'BalanceRiferos',
      'Zonas',
      'CrearZonas',
      'EditarZonas',
      'EliminarZonas',
      'Sorteos',
      'CerrarVentas',
      'GuardarPremios',
      'CorregirPremios',
      'ReiniciarVentas',
      'NoLaborable',
      'Limites',
      'Controles',
      'Usuarios',
      'CrearUsuarios',
      'EditarUsuarios',
      'EliminarUsuarios',
      'Cuentas',
      'Grupos',
      'Configuraciones',
      'ConfiguracionesGenerales',
      'EsquemasPrecios',
      'Alertas',
      'Reportes',
      'ReporteVenta',
      'ReporteTransacciones',
      'ReporteRecargas',
      'Flujo',
      'Movimientos',
      'IngresosGastos'
    ]
  constructor(
    public permissionsService: NgxPermissionsService
  ) {


  }
  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

  }

  getUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.AllPermissions;
  }

}
