import { Component, OnInit, TemplateRef } from '@angular/core';
import { LibrariesService } from '../../Services/Common/libraries-service.service';



@Component({
  selector: 'toasts',
  templateUrl: './toast.component.html',
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastComponent {
  constructor(public toastService: LibrariesService) { }


  HasIcon(toast) { if (toast.icon) { return true; } else { return false; } }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
