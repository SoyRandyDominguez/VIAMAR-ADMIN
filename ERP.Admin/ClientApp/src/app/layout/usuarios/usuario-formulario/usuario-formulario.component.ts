import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuarios } from '../../../Models/Usuarios/usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService, Combobox, DataApi } from '../../../Services/HTTPClient/base.service';
import { MustMatch } from '../../../Helpers/Validators/must-match.validator';

@Component({
    selector: 'usuario-formulario',
    templateUrl: './usuario-formulario.component.html',
    styleUrls: ['./usuario-formulario.component.scss']
})
export class UsuarioFormularioComponent implements OnInit {

    public Formulario: FormGroup;
     UsuarioID: number;
    public ElUsuario: Usuarios;
    submitted: boolean = false;
    Cargando: boolean = false;
    @Output() Usuario = new EventEmitter();
    btnGuardarCargando = false;
    public mostrarBalanceMinimoCaja: boolean;
    public claveAnterior: string = "";
    public tiposUsuarios: Combobox[] = [];
    public Riferos: Combobox[] = [];
    public RiferoSelected: any;


  constructor(public formBuilder: FormBuilder, public base: BaseService,
    public route: ActivatedRoute, public  router: Router) { }



    ngOnInit() {
        this.UsuarioID = Number(this.route.snapshot.paramMap.get('id'));
        this.CreateForm();
        if (this.UsuarioID >= 0) {
            this.GetToEdit();
            this.GetTiposUsuarios();
            this.GetRiferos();
        } else {
            this.router.navigateByUrl("/usuarios");
        }
    }

     CreateForm() {
        this.Formulario = this.formBuilder.group({
            usuarioID: [this.UsuarioID],
            tipoUsuarioID: ['',Validators.required],
            RiferoID: [''],
            usuNombre: ['', Validators.required],
            usuApellido: ['', Validators.required],
            usuCedula: ['', Validators.required],
            email: ['' ],
            usuFechaNac: [''],
            usuUserName: ['', Validators.required],
            usuClave: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
            usuClaveConfirm: ['', [Validators.required, Validators.minLength(2)]],
            balanceMinimoCaja: [''],
            usuActivo: [false],
            //UsuNivel: [99999, Validators.required],
            usuComentario: ['']
        }, {
            validator: MustMatch('usuClave', 'usuClaveConfirm')
        });
    }


    //dataModelChanged() {
    //    console.log(this.RiferoSelected);
    //}

    GetToEdit() {
        this.Cargando = true;
        this.base.DoPost<Usuarios>(DataApi.MUsuario, "GetToEdit", { "UsuarioID": this.UsuarioID })
            .subscribe(x => {
                x.records.forEach(z => {
                    this.ElUsuario = z;
                    this.Formulario.setValue({
                        usuarioID: z.usuarioID,
                        tipoUsuarioID: z.tipoUsuarioID,
                        email: z.email,
                        RiferoID: z.riferoID,
                        usuNombre: z.usuNombre,
                        usuApellido: z.usuApellido, usuCedula: z.usuCedula,
                        usuFechaNac: z.usuFechaNac, usuUserName: z.usuUserName,
                        usuClave: z.usuClave, usuActivo: z.usuActivo, usuComentario: z.usuComentario, usuClaveConfirm: "", balanceMinimoCaja: ""
                    });

                    //asignar balance minimo de la caja
                    if (x.valores.length > 0) {
                        this.f.balanceMinimoCaja.setValue(x.valores[0]);
                    }

                    let clave = z.usuClave;
                    this.claveAnterior = clave;
                })
                this.Cargando = false;
            });


    }

    GetTiposUsuarios() {
        this.Cargando = true;
        this.base.DoPost<Combobox>(DataApi.ComboBox, "GetTiposUsuarios", null).subscribe(x => {
            if (x.ok) {
                this.tiposUsuarios = [];
                x.records.forEach(rifero => {
                    this.tiposUsuarios.push(rifero);
                });
            } else {
                console.log(x.errores[0]);
            }
            this.Cargando = false;
        });
    }

    GetRiferos() {
        this.Cargando = true;
        this.base.DoPost<Combobox>(DataApi.ComboBox, "GetRiferos", null).subscribe(x => {
            if (x.ok) {
                this.Riferos = [];
                x.records.forEach(rifero => {
                    this.Riferos.push(rifero);
                });
            } else {
                console.log(x.errores[0]);
            }
            this.Cargando = false;
        });
    }



    get f() { return this.Formulario.controls; }


    onSubmit(event) {


        this.submitted = true;

        if (this.f.usuClave.value == this.claveAnterior) {
            this.f.usuClaveConfirm.setValue(this.claveAnterior);
        }

        if (this.Formulario.invalid) {
            this.f.usuClaveConfirm.setValue("");
            return;
        }

        // Usamos el método emit
        let usuario = new Usuarios();
        usuario.usuarioID = this.f.usuarioID.value;
        usuario.RiferoID = this.f.RiferoID.value;
        usuario.tipoUsuarioID = this.f.tipoUsuarioID.value;
        usuario.email = this.f.email.value;
        usuario.usuNombre = this.f.usuNombre.value;
        usuario.usuApellido = this.f.usuApellido.value;
        usuario.usuCedula = this.f.usuCedula.value;
        usuario.usuFechaNac = this.f.usuFechaNac.value;
        usuario.usuClave = this.f.usuClave.value;
        usuario.usuActivo = this.f.usuActivo.value;
        usuario.usuComentario = this.f.usuComentario.value;
        usuario.usuUserName = this.f.usuUserName.value;
        usuario.usuNivel = this.f.tipoUsuarioID.value;
        this.Usuario.emit(usuario);
    }

}
