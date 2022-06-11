import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { DisableDuringAjaxService } from './disable-during-ajax.service';

@Injectable()
export class DisableDuringAjaxInterceptor implements HttpInterceptor {
  
  constructor(private busyService: DisableDuringAjaxService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {

            if ((req.headers.get('NgxDisableDuringAjaxSkip') != 'true')) {

                // If request was sent
                if ((event.type === 0)) {
                    //console.log("busy");
                    this.busyService.changeBusy(true);
                }
                else {
                    //console.log("not busy");
                    this.busyService.changeBusy(false);
                }
            }

        }),
        catchError((err: HttpErrorResponse) => {

          this.busyService.changeBusy(false);
    
                    return throwError(err)
          })) as Observable<HttpEvent<any>>

  }
}