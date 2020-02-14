import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {
  toasts: any[] = [];
  constructor() { }


  showToast(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  removeToast(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }







}
