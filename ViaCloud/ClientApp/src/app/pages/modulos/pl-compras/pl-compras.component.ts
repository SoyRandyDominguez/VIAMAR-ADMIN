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

    productos: productosRundown[] = [];

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



    displayedColumns =
        [
        'Tipo', 
        'Enero', 
        'Febrero', 
        'Marzo', 
        'Abril', 
        'Mayo', 
        'Junio', 
        'Julio', 
        'Agosto', 
        'Septiembre', 
        'Octubre', 
        'Noviembre', 
        'Diciembre', 
        ];

    ELEMENT_DATA: PeriodicElement[] = [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
        { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
        { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
        { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
        { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
        { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    ];
    dataSource = [];







    constructor() { }



    ngOnInit() {

        this.getYears(2000);

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
                articuloId: 1, articulo: 'Ecosport',
                valores: '{     "enero":0,     "febrero":0,     "marzo":0,     "abril":0,     "mayo":0,     "junio":2,     "julio":0,     "agosto":0,     "septiembre":0,     "octubre":0,     "noviembre":0,     "diciembre":0  }'
            },
            {
                rundownID: 3, tipoRundownId: 1, rundown: 'Shipments ', companiaId: 1,
                companiaNombre: 'Viamar SA', anioId: 122, anio: '2021', marcaId: 1, marcaNombre: 'Mazda',
                articuloId: 3, articulo: 'VEGETA',
                valores: '{     "enero":0,     "febrero":0,     "marzo":0,     "abril":0,     "mayo":0,     "junio":0,     "julio":0,     "agosto":0,     "septiembre":0,     "octubre":0,     "noviembre":0,     "diciembre":0  }'
            }
        ]);
        console.log(this.productos);


            


    }

    getDataSource(rundowns:rundown[]){
        let retorno = [];
        rundowns.forEach(z => {

            let o = {
                tipo: z.rundown,
                enero: z.valores.enero,
                febrero: z.valores.febrero,
                marzo: z.valores.marzo,
                abril: z.valores.abril,
                mayo: z.valores.mayo,
                junio: z.valores.junio,
                julio: z.valores.julio,
                agosto: z.valores.agosto,
                septiembre: z.valores.septiembre,
                octubre: z.valores.octubre,
                noviembre: z.valores.noviembre,
                diciembre: z.valores.diciembre,
            }
            // console.table(o);
            retorno.push(o);
        });

        return retorno;
    }






    getYears(startYear) {
        startYear = (typeof (startYear) == 'undefined') ? 1980 : startYear
        let currentYear = new Date().getFullYear();
        let years = []
        for (var i = startYear; i <= currentYear + 10; i++) {
            years.push(i);
        }
        this.years = years;
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
        // var groupArray = require('group-array');
        //  console.log(  groupArray(result, 'articulo'));

        var groups = {};
        for (var i = 0; i < result.length; i++) {
            var groupName = result[i].articulo;
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push(result[i]);
        }
        //    let resultado:productosRundown[] = [];
        for (var groupName in groups) {
            this.productos.push({ articulo: groupName, rundowns: groups[groupName] });
        }

        // console.log(resultado);


    }








}

export class productosRundown {
    articulo: string;
    rundowns: rundown[];

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

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}




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






export class Productos {
    productoId: number;
    productoNombre: string;
    valores: Cantidades
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
