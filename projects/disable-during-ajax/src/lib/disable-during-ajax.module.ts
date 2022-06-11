import { NgModule } from '@angular/core';
import { DisableDuringAjaxDirective } from './disable-during-ajax.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DisableDuringAjaxInterceptor } from './disable-during-ajax.interceptor';
import { DisableDuringAjaxService } from './disable-during-ajax.service';

@NgModule({
  declarations: [
    DisableDuringAjaxDirective
  ],
  imports: [
  ],
  providers: [
    DisableDuringAjaxService,
    { provide: HTTP_INTERCEPTORS, useClass: DisableDuringAjaxInterceptor, multi: true }
  ],
  exports: [
    DisableDuringAjaxDirective
  ]
})
export class DisableDuringAjaxModule { }
