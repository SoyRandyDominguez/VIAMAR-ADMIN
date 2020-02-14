import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PermisosTreeView } from '../../../Models/Usuarios/permisos-tree-view';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { BaseService, DataApi } from '../../../Services/HTTPClient/base.service';

@Component({
    selector: 'app-permisos-tree-view',
    templateUrl: './permisos-tree-view.component.html',
    styleUrls: ['./permisos-tree-view.component.scss']
})
export class PermisosTreeViewComponent implements OnInit {
    public permisosTree: PermisosTreeView[] = [];
    public permisosRegistradosBD: PermisosTreeView[] = [];
    // maps the appropriate column to fields property
    public field: Object = {};
    // set the CheckBox to the TreeView
    public showCheckBox: boolean = true;
    public Cargando: boolean = false;

    public UsuarioID: number;
    @Output() mostrarBalanceMinimo = new EventEmitter<boolean>();
    @ViewChild('treeview', { static: false }) tree: TreeViewComponent;

  constructor(public base: BaseService, public route: ActivatedRoute, public  router: Router) { }

    ngOnInit() {
        this.UsuarioID = Number(this.route.snapshot.paramMap.get('id'));
        this.getPermisos()
    }


    getPermisos() {
        this.Cargando = true;
        this.base.DoPost<PermisosTreeView>(DataApi.PermisosUsuario, "GetPermisosByUsuarioID", { "@UsuarioID": this.UsuarioID }).subscribe(x => {
            let permisos: object[] = [];

            x.records.forEach(z => {
                permisos.push({ permisoID: z.permisoID, nombre: z.nombre, permisoPadreID: z.permisoPadreID, hasChild: z.hasChild, isChecked: z.isChecked })
                this.permisosRegistradosBD.push(z);

                if (z.isChecked) {

                    this.permisosTree.push({
                        permisoID: z.permisoID, expanded: false,
                        hasChild: false, isChecked: true,
                        nivel: 1, nombre: "", permisoPadreID: z.permisoPadreID
                    });
                    this.mostrarBalanceMinimo.emit(this.permisosTree.some(x => x.permisoPadreID == "2200000"));
                }

            });
            if (this.UsuarioID < 1) {
                permisos.forEach(p => {
                    if (p["permisoID"] == "101") {
                        p["isChecked"] = true;
                    }
                });
            }

            this.field = { dataSource: permisos, id: 'permisoID', parentID: 'permisoPadreID', text: 'nombre', hasChildren: 'hasChild', isChecked: "isChecked" }
            this.Cargando = false;
        });
    }

    public nodeChecked(args): void {
        this.permisosTree = [];
        this.tree.checkedNodes.forEach(x => {
            this.permisosTree.push({
                permisoID: x, expanded: false,
                hasChild: false, isChecked: true,
                nivel: 1, nombre: "", permisoPadreID: this.permisosRegistradosBD.filter(j => j.permisoID == x)[0].permisoPadreID
            });
        });
        this.mostrarBalanceMinimo.emit(this.permisosTree.some(x => x.permisoPadreID == "2200000"));
    }


}
