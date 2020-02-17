import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from "@auth0/angular-jwt";
import { RequestContenido, RespuestaContenido, Paginacion } from '../../Models/HTTP/RequestResponse';

const helper = new JwtHelperService();

export enum DataApi {
    Usuario = 1,
    Authentication = 2,
    ComboBox = 3,
}


@Injectable({
    providedIn: 'root'
})
export class BaseService {

    dataApiRootMap: { [api: string]: string } = {
        "1": "api/Usuario",
        "2": "api/Authentication",
        "3": "api/ComboBox",
    };

    http: HttpClient;
    baseUrl: string;

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
        return this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
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




