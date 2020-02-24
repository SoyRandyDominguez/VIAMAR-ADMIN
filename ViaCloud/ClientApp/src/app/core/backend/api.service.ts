
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from './../models/Api/response.model';
import { Request } from './../models/Api/request.model';
import { Paginacion } from '../models/Api/paginacion.model';
import { DataApi } from '../enums/data-api';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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

    
    public GetOne<T>(api: DataApi, Method: string, id: number): Observable<Response<T>> {
        let request = new Request<T>();
        request.parametros = { '@Id': id };
        return this.http
            .post<Response<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);

    }

    public GetAll<T>(api: DataApi, Method: string, parametros: any = {}): Observable<Response<T>> {
        let request = new Request<T>();
        request.parametros = parametros;
        return this.http
            .post<Response<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request)
    }

    public GetAllWithPagination<T>(api: DataApi, Method: string, Columna: string, PaginaNo: number = 1, PaginaSize: number = 10, OrderASC: boolean = true, parametros: any = {}): Observable<Response<T>> {
        let request = new Request<T>();
        request.parametros = parametros;
        request.pagina = new Paginacion();
        request.pagina.paginaNo = PaginaNo;
        request.pagina.paginaSize = PaginaSize;
        request.pagina.ordenAsc = OrderASC;
        request.pagina.ordenColumna = Columna;
        return this.http.post<Response<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
    }

    public DoPost<T>(api: DataApi, Method: string, parametros: any): Observable<Response<T>> {
        let request = new Request<T>();
        request.parametros = parametros;
        return this.http.post<Response<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
    }


    // public DoPostRecord<T>(api: DataApi, Method: string, parametros: any, records: T[]): Observable<RespuestaContenido<T>> {
    //     let request = new RequestContenido<T>();
    //     request.parametros = parametros;
    //     request.records = records;
    //     return this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
    // }

    // public async DoPostPromise<T>(api: DataApi, Method: string, parametros: any) {
    //     let request = new RequestContenido<T>();
    //     request.parametros = parametros;
    //     return await this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request).toPromise();
    // }

    public DoPostAny<T>(api: DataApi, Method: string, request: any): Observable<Response<T>> {
        return this.http.post<Response<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
        //return this.http.post<RespuestaContenido<T>>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request, httpOptions);
    }

    public GetComboBox<T>(Method: string): Observable<Response<T>> {
        let request = new Request<T>();
        return this.http
            .post<Response<T>>(this.baseUrl + this.dataApiRootMap[DataApi.ComboBox] + "/" + Method, request)
    }

    // public DoPostResponseClass<T>(api: DataApi, Method: string, parametros: any): Observable<T> {
    //     let request = new RequestContenido<T>();
    //     request.parametros = parametros;
    //     return this.http.post<T>(this.baseUrl + this.dataApiRootMap[api] + "/" + Method, request);
    // }

}
