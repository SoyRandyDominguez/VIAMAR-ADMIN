import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class ConstantsService {
  readonly AllPermissions =
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


}
