import { Component, OnInit, ViewChild } from '@angular/core';

import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { PermisosTreeView } from '../../../Models/Usuarios/permisos-tree-view';
import { ActivatedRoute, Router } from '@angular/router';
import { RiferosUsuario } from '../../../Models/Usuarios/riferos-usuario';
import { DataApi, BaseService } from '../../../Services/HTTPClient/base.service';
@Component({
    selector: 'app-usuarios-riferos',
    templateUrl: './usuarios-riferos.component.html',
    styleUrls: ['./usuarios-riferos.component.scss']
})
export class UsuariosRiferosComponent implements OnInit {

    public riferos: RiferosUsuario[] = [];
    // maps the appropriate column to fields property
    public field: Object = {};
    // set the CheckBox to the TreeView
    public showCheckBox: boolean = true;
    public UsuarioID: number;


    @ViewChild('treeview', { static: false }) tree: TreeViewComponent;

  constructor(public base: BaseService, public  route: ActivatedRoute,
         router: Router) { }

    ngOnInit() {
        this.UsuarioID = Number(this.route.snapshot.paramMap.get('id'));
        this.getRiferos();
    }


    getRiferos() {
        this.base.DoPost<RiferosUsuario>(DataApi.RiferosUsuario, "GetRiferosByUsuarioID", { "@UsuarioID": this.UsuarioID }).subscribe(x => {
            let riferos: object[] = [];
            x.records.forEach(z => {
                riferos.push({
                    permisoID: z.riferoID, nombre: z.rifNombre,
                    //permisoPadreID: z.permisoPadreID,
                    hasChild: false, isChecked: z.isChecked
                })
            });

            this.field = {
                dataSource: riferos
                , id: 'permisoID', parentID: 'permisoPadreID', text: 'nombre',
                hasChildren: 'hasChild', isChecked: "isChecked"
            }
        });
    }

    public nodeChecked(args): void {
        this.tree.checkedNodes.forEach(x => {
            this.riferos.push({riferoID:x,usuarioID:this.UsuarioID.toString(),isChecked:true,rifNombre:""});
        });
    }

}
