import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-DateTimePicker',
    templateUrl: './DateTimePicker.component.html',
    styleUrls: ['./DateTimePicker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePicker implements OnInit {

    public dateTime: Date;

    constructor() {
    }

    ngOnInit() {
    }

}
