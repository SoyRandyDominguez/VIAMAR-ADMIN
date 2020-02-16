import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();


export enum DataApi {
    Usuario = 1,
    FuncionAdmin = 2,
    MZonas = 3,
    MUsuario = 4,
    Banca = 5,
    BancaConfig = 6,
    Rifero = 7,
    UsuarioRiferoData = 8,
    Limites = 9,
    SorteosPremios = 10,
    Alerta = 11,
    Venta = 12,
    TotalesTicket = 13,
    DetalleJugada = 14,
    ProvinciaData = 15,
    TimerSorteo = 16,
    Cuenta = 17,
    TerminalesCuenta = 18,
    Configuraciones = 19,
    PreciosHoras = 20,
    ComboBox = 21,
    Grupo = 22,
    TerminalesGrupo = 23,
    Mensajes = 24,
    Transaccion = 25,
    MUsuarioPermisosData = 26,
    Suplidor = 27,
    Vendedor = 28,
    RecargaDetalle = 29,
    VentasLocalesData = 30,
    Sorteos = 31,
    BancaConexion = 32,
    AuthUser = 33,
    PermisosUsuario = 34,
    BancaEsquemaGrupo = 35,
    RiferosUsuario = 36,
    LimitesControles = 37,
    FlujoMovimiento = 38,
    FlujoIngresoEgreso = 39,
    DashBoardCards = 40,
    FaltanteSobrante = 41,
    FlujoRutaConfig = 42,
    FlujoTerminales = 43,
    Authentication = 44,
    Values = 45
}

const httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
}


@Injectable({
    providedIn: 'root'
})

export class BaseService {
    http: HttpClient;
    baseUrl: string;

    dataApiRootMap: { [api: string]: string } = {
        "1": "api/Usuario",
        "2": "api/FuncionAdminData",
        "3": "api/MZonasData",
        "4": "api/MUsuariosData",
        "5": "api/BancaData",
        "6": "api/BancaConfig",
        "7": "api/RiferoData",
        "8": "api/UsuarioRiferoData",
        "9": "api/LimiteData",
        "10": "api/SorteoPremioData",
        "11": "api/AlertasData",
        "12": "api/VentaData",
        "13": "api/TotalesTicketData",
        "14": "api/DetalleJugadaData",
        "15": "api/RegionData",
        "16": "api/TimerSorteoData",
        "17": "api/CuentaData",
        "18": "api/TerminalesCuentasData",
        "19": "api/ConfiguracionesData",
        "20": "api/PreciosHoraData",
        "21": "api/ComboBoxData",
        "22": "api/GrupoData",
        "23": "api/TerminalesGrupoData",
        "24": "api/Mensajes",
        "25": "api/TransaccionData",
        "26": "api/MUsuarioPermisosData",
        "27": "api/SuplidorData",
        "28": "api/VendedorData",
        "29": "api/RecargaDetalleData",
        "30": "api/VentasLocalesData",
        "31": "api/SorteoData",
        "32": "api/BancaConexion",
        "33": "api/UserAuthData",
        "34": "api/PermisosUsuarioData",
        "35": "api/BancaEsquemaGrupo",
        "36": "api/RiferosUsuarioData",
        "37": "api/LimitesControlesData",
        "38": "api/MovimientosData",
        "39": "api/IngresosEgresos",
        "40": "api/DashboardCardData",
        "41": "api/FaltanteSobranteData",
        "42": "api/RutaConfigData",
        "43": "api/TerminalData",
        "44": "api/Authentication",
        "45": "api/Values"
    };



    constructor(_http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
        this.http = _http;
        this.baseUrl = _baseUrl;
    }


    public GetOne<T>(api: DataApi, Method: string, id: number): Observable<RespuestaContenido<T>> {
        let request = new RequestContenido<T>();
        request.parametros = { '@Id': id };
        return this.http
            .post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);

    }


    public GetAll<T>(api: DataApi, Method: string, parametros: any = {}): Observable<RespuestaContenido<T>> {
        let request = new RequestContenido<T>();
        request.parametros = parametros;
        return this.http
            .post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request)
    }


    //public async GetAllPromise<T>(api: DataApi, Method: string): Promise<RespuestaContenido<T>> {
    //    return await this.http
    //        .get<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method).toPromise()
    //}


    public GetAllWithPagination<T>(api: DataApi, Method: string, Columna: string, PaginaNo: number = 1, PaginaSize: number = 10, OrderASC: boolean = true, parametros: any = {}): Observable<RespuestaContenido<T>> {
        let request = new RequestContenido<T>();
        request.parametros = parametros;
        request.pagina = new Paginacion();
        request.pagina.paginaNo = PaginaNo;
        request.pagina.paginaSize = PaginaSize;
        request.pagina.ordenAsc = OrderASC;
        request.pagina.ordenColumna = Columna;
        return this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
    }


    //public async GetAllWithPaginationPromise<T>(api: DataApi, Method: string, Columna: string, PaginaNo: number = 1, PaginaSize: number = 10, OrderASC: boolean = true, parametros: any = {}): Promise<RespuestaContenido<T>> {
    //    let request = new RequestContenido<T>();
    //    request.parametros = parametros;
    //    request.pagina = new Paginacion();
    //    request.pagina.paginaNo = PaginaNo;
    //    request.pagina.paginaSize = PaginaSize;
    //    request.pagina.ordenAsc = OrderASC;
    //    request.pagina.ordenColumna = Columna;
    //    return await this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request).toPromise();
    //}


    public DoPost<T>(api: DataApi, Method: string, parametros: any): Observable<RespuestaContenido<T>> {
        let request = new RequestContenido<T>();
        request.parametros = parametros;
        return this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
    }


    public DoPostRecord<T>(api: DataApi, Method: string, parametros: any, records: T[]): Observable<RespuestaContenido<T>> {
        let request = new RequestContenido<T>();
        request.parametros = parametros;
        request.records = records;
        return this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
    }

    public async DoPostPromise<T>(api: DataApi, Method: string, parametros: any) {
        let request = new RequestContenido<T>();
        request.parametros = parametros;
        return await this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request).toPromise();
    }

    public DoPostAny<T>(api: DataApi, Method: string, request: any): Observable<RespuestaContenido<T>> {
        return this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request, httpOptions);
    }

    public GetComboBox<T>(Method: string): Observable<RespuestaContenido<T>> {
        let request = new RequestContenido<T>();
        return this.http
            .post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[DataApi.ComboBox] + "/" + Method, request)
    }

    public DoPostResponseClass<T>(api: DataApi, Method: string, parametros: any): Observable<T> {
        let request = new RequestContenido<T>();
        request.parametros = parametros;
        return this.http.post<T>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
    }




}

export class RequestContenido<T>   {
    records: T[];
    parametros: any;
    pagina: Paginacion;
}


export class RespuestaContenido<T>  {
    ok: boolean;
    errores: string[];
    mensajes: string[];
    records: Array<T>;
    valores: any[];
    pagina: Paginacion;
}

export class Paginacion {
    public paginaNo: number = 0;
    public paginaSize: number = 0;
    public paginaRecords: number;
    public totalPaginas: number;
    public totalRecords: number;
    public ordenAsc: boolean;
    public ordenColumna: string;
}


export class Combobox {
    nombre: string
    grupo: string
    grupoID: string
    codigo: number
    //disabled: boolean
}




export class ModeloBase {
    constructor(data: any = null, mappingOptions: any = null, idColumn: string = null) {
        if (data) {
            //ko.mapping.fromJS(data, mappingOptions, this);
            //if (data[idColumn] != null) {
            //  _pagina.setUnModelo(this, data[idColumn]);
            //}
        }
    }

    dispose = () => {
        // to do or to override
    }

    FechaUltimaCarga: Date = new Date();
}


