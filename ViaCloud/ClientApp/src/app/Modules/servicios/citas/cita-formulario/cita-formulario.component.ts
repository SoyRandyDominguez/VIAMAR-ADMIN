import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cita-formulario',
    templateUrl: './cita-formulario.component.html',
    styleUrls: ['./cita-formulario.component.css']
})
export class CitaFormularioComponent implements OnInit {

    public items = [
        { n: "1" },
        { n: "2" },
        { n: "3" },
        { n: "4" },
        { n: "5" },
        { n: "6" },
        { n: "7" },
        { n: "8" },
        { n: "9" },
        { n: "10" },
    ]



    constructor() { }




    ngOnInit() {
    }

}
