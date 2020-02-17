import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    toasts: any[] = [];
    constructor() { }


    showToast(textOrTpl: string | TemplateRef<any>, options: any = {}) {
        this.toasts.push({ textOrTpl, ...options });
    }

    removeToast(toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    Danger(error: string) {
        this.showToast(error, { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }
    Warning(error: string) {
        this.showToast(error, { classname: 'bg-warning text-light', icon: "fas fa-exclamation-triangle", delay: 1800 });
    }

    Success(mensaje: string = "Operación realizada.") {
        this.showToast(mensaje, { classname: 'bg-success text-white ', icon: "fas fa-check-square" });
    }

    MostrarMensajeDeErrorConexionServidor() {
        this.showToast("Error al conectar con el servidor", { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
    }


}
