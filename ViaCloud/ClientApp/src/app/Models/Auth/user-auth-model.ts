export class UserAuthModel {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token?: string;
  companiaID: number;
  sucursalID: number;
  permisos?: Permisos[];
}
export class Permisos {

  usuarioID: number;
  funcionId: number;
  funcionPadreId: number;
  permisoNombre: string;

}


export enum MenuEnum {
  Central = "Central",
  Venta = 'Venta',
  Recarga = 'Recarga',
  Configuraciones = 'Configuraciones',
  Usuarios = 'Usuarios',
  Cuentas = 'Cuentas',
  Sorteos = 'Sorteos',
  Alerta = 'Alerta',
  Transaccion = 'Transaccion',
  Grupos = 'Grupos',
  Admin = 'Admin'
}
