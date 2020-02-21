import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cita-listado',
    templateUrl: './cita-listado.component.html',
    styleUrls: ['./cita-listado.component.css']
})
export class CitaListadoComponent implements OnInit {

    subtitle: string;
    constructor() {
        this.subtitle = 'This is some text within a card block.';
    }

    ngOnInit() {
    }

}
