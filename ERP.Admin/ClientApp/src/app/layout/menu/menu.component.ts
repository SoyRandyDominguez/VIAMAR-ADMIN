import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthModel } from '../../Models/Auth/user-auth-model';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  currentUser: UserAuthModel;
  MenuClose: boolean = false;
  Central = ['Admin', 'Riferos', 'CrearRiferos', 'EliminarRiferos', 'EditarRiferos', 'BalanceRiferos','Banca',
           'EditarBancas', 'MensajeGeneral', 'MensajeDirecto', 'Zonas', 'CrearZonas', 'EditarZonas', 'EliminarZonas'
         , 'Cuentas', 'Grupos'];
  Bancas = ['Admin', 'EditarBancas', 'MensajeGeneral', 'MensajeDirecto'];
  Riferos = ['Admin', 'Riferos', 'CrearRiferos', 'EliminarRiferos', 'EditarRiferos', 'BalanceRiferos'];
  Zonas = ['Admin', 'Zonas', 'CrearZonas', 'EditarZonas', 'EliminarZonas'];
  Cuentas = ['Admin', 'Cuentas'];
  Grupos = ['Admin', 'Grupos'];
  Limites = ['Admin', 'Limites', 'LimiteNumeros', 'LimiteSorteos'];
  LimiteNumeros = ['Admin', 'LimiteNumeros'];
  LimiteSorteosG = ['Admin', 'LimiteSorteos'];
  Usuarios = ['Admin', 'CrearUsuarios', 'EditarUsuarios', 'EliminarUsuarios'];
  Loterias = ['Admin', 'Sorteos', 'CerrarVentas', 'GuardarPremios', 'CorregirPremios', 'ReiniciarVentas', 'NoLaborable'];
  AdmLoterias = ['CerrarVentas', 'GuardarPremios', 'CorregirPremios', 'ReiniciarVentas', 'NoLaborable'];
  ConfLoterias = [];
  Alertas = ['Admin', 'Alertas'];
  Configuraciones = ['Admin', 'Configuraciones', 'ConfiguracionesGenerales'];
  Precios = ['Admin', 'EsquemasPrecios'];
  Reportes = [];
  Flujo = ['Admin', 'Flujo', 'Movimientos', 'IngresosGastos'];
  Movimientos = ['Admin', 'Movimientos'];
  IngresosGastos = ['Admin', 'IngresosGastos'];
  Rutas = [];


  constructor(
    public router: Router,
    public permissionsService: NgxPermissionsService
  ) { }


  ngOnInit() {
    console.log(this.permissionsService.getPermissions());
  }


  toogleMenu() {
    this.MenuClose = !this.MenuClose;
  }




}
