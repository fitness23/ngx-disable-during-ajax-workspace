import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisableDuringAjaxService {

    numberOfBusyRequests: number = 0;
    numberOfNonBusyRequests: number = 0;

    // Observable navItem source
    private _busySource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    busy$ = this._busySource.asObservable();

    constructor() { }

    changeBusy(val: boolean) {

        if ((val === true)) {
            this.numberOfBusyRequests++;
        }
        else {
            this.numberOfNonBusyRequests++;
        }


        if (this.numberOfBusyRequests === this.numberOfNonBusyRequests)
        {
            this._busySource.next(false);
        }
        else
        {
            this._busySource.next(true);
        }

    }
}
