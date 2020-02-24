import { Paginacion } from './paginacion.model';

export class Response<T>  {
    ok: boolean;
    errores: string[];
    mensajes: string[];
    records: Array<T>;
    valores: any[];
    pagina: Paginacion;
}
