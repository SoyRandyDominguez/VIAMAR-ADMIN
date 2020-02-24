import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { ComboBox } from 'src/app/core/models/Api/ComboBox.model';

@Component({
    selector: 'vex-pl-compras',
    templateUrl: './pl-compras.component.html',
    styleUrls: ['./pl-compras.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        stagger60ms,
        fadeInUp400ms
    ]
})
export class PlComprasComponent implements OnInit {

    years = [];
    selectedProcedencia: ComboBox = { codigo: "1", nombre: 'Ford / Canada', grupoID: 1, grupo: 'Canada', disabled: false };
    selectedAnio = "2020"
    marcaProcedencia: ComboBox[] = [
        { codigo: "1", nombre: 'Ford / Canada', grupoID: 1, grupo: 'Canada', disabled: false },
        { codigo: "2", nombre: 'Mazda / Canada', grupoID: 1, grupo: 'Canada', disabled: false },
        { codigo: "3", nombre: 'Kia / Canada ', grupoID: 1, grupo: 'Canada', disabled: false },
        { codigo: "4", nombre: 'Ford / USA', grupoID: 2, grupo: 'USA', disabled: false },
        { codigo: "5", nombre: 'Mazda / USA', grupoID: 2, grupo: 'USA', disabled: false },
        { codigo: "6", nombre: 'Kia / USA', grupoID: 2, grupo: 'USA', disabled: false },
    ];







    displayedColumns = [
        'tipo', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];


    dataSource = ELEMENT_DATA;



    constructor() { }


    getYears(startYear) {
        startYear = (typeof (startYear) == 'undefined') ? 1980 : startYear
        let currentYear = new Date().getFullYear();
        let years = []
        for (var i = startYear; i <= currentYear + 10; i++) {
            years.push(i);
        }
        this.years = years;
    }

    ngOnInit() {

        this.test();
        this.getYears(2000);

        if (localStorage.getItem('PLC') != null) {
            // this.productos = JSON.parse(localStorage.getItem('PLC'));
        }

    }
    guardarLocal() {

        //console.log(this.productos);
        // localStorage.setItem('PLC', JSON.stringify(this.productos));

    }


    rundownMapper(rundowns: rundownCrudo[]) {
        let result: rundown[] = [];
        rundowns.forEach(x => {
            result.push(
                {
                    rundownID: x.rundownID,
                    tipoRundownId: x.tipoRundownId,
                    rundown: x.rundown,
                    companiaId: x.companiaId,
                    companiaNombre: x.companiaNombre,
                    anioId: x.anioId,
                    anio: x.anio,
                    marcaId: x.marcaId,
                    marcaNombre: x.marcaNombre,
                    articuloId: x.articuloId,
                    articulo: x.articulo,
                    valores: JSON.parse(x.valores)
                }
            );
        });
        return result;
    }



    test() {


        const array: rundown[] =
            this.rundownMapper([
                {
                    rundownID: 1, tipoRundownId: 1, rundown: 'Order', companiaId: 1,
                    companiaNombre: 'Viamar SA', anioId: 122, anio: '2021', marcaId: 1, marcaNombre: 'Ford',
                    articuloId: 1, articulo: 'Ecosport',
                    valores: '{     "enero":0,     "febrero":0,     "marzo":0,     "abril":0,     "mayo":0,     "junio":2,     "julio":0,     "agosto":0,     "septiembre":0,     "octubre":0,     "noviembre":0,     "diciembre":0  }'
                },
                {
                    rundownID: 2, tipoRundownId: 2, rundown: 'Shipments ', companiaId: 1,
                    companiaNombre: 'Viamar SA', anioId: 122, anio: '2021', marcaId: 1, marcaNombre: 'Ford',
                    articuloId: 2, articulo: 'Ecosport',
                    valores: '{     "enero":0,     "febrero":0,     "marzo":0,     "abril":0,     "mayo":0,     "junio":2,     "julio":0,     "agosto":0,     "septiembre":0,     "octubre":0,     "noviembre":0,     "diciembre":0  }'
                }
            ]);


        const result = [];
        const map = new Map();
        for (const item of array) {
            if (!map.has(item.articuloId)) {
                map.set(item.articuloId, true);    // set any value to Map
                result.push({
                    articuloId: item.articuloId,
                    articulo: item.articulo,
                    valores: item.valores
                });
            }
        }
        console.table(result)
    }



}



export interface PlElement {

    tipo: string;
    enero: number;
    febrero: number;
    marzo: number;
    abril: number;
    mayo: number;
    junio: number;
    julio: number;
    agosto: number;
    septiembre: number;
    octubre: number;
    noviembre: number;
    diciembre: number;

}

const ELEMENT_DATA: PlElement[] = [
    { tipo: 'Order', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
    { tipo: 'Production', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
    { tipo: 'Shiptments', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
    { tipo: 'Arrivsl', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
    { tipo: 'Sales', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
    { tipo: 'Stock', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
    { tipo: 'MOS (+3)', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
    { tipo: 'MOS (-3)', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
    { tipo: 'MOS (+6)', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
    { tipo: 'MOS (-6)', enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 },
];



export class rundownCrudo {
    rundownID: number;
    tipoRundownId: number;
    rundown: string;
    companiaId: number;
    companiaNombre: string;
    anioId: number;
    anio: string;
    marcaId: number;
    marcaNombre: string;
    articuloId: number;
    articulo: string;
    valores: string;

}

export class rundown {
    rundownID: number;
    tipoRundownId: number;
    rundown: string;
    companiaId: number;
    companiaNombre: string;
    anioId: number;
    anio: string;
    marcaId: number;
    marcaNombre: string;
    articuloId: number;
    articulo: string;
    valores: Cantidades;
}





export class ProductosPLCompras {

    productoID: number;
    nombreProd: String;
    plComprasValores: PlElement[]

}

export class PLComprasValores {
    nombre: string;
    values: Cantidades[];
}
export class Cantidades {
    enero: number;
    febrero: number;
    marzo: number;
    abril: number;
    mayo: number;
    junio: number;
    julio: number;
    agosto: number;
    septiembre: number;
    octubre: number;
    noviembre: number;
    diciembre: number;
}
