import { Paginacion } from './paginacion.model';

export class Request<T> {
    records: T[];
    parametros: any;
    pagina: Paginacion;
}
