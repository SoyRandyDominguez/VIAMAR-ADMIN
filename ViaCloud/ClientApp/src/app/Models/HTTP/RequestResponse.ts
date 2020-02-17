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
