import { ModuleWithProviders, NgModule } from '@angular/core';
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
    //{ provide: HTTP_INTERCEPTORS, useClass: DisableDuringAjaxInterceptor, multi: true }
  ],
  exports: [
    DisableDuringAjaxDirective
  ]
})
export class DisableDuringAjaxModule {
  static forRoot(): ModuleWithProviders<DisableDuringAjaxModule> {
    return {
      ngModule: DisableDuringAjaxModule,
      providers: [DisableDuringAjaxService, { provide: HTTP_INTERCEPTORS, useClass: DisableDuringAjaxInterceptor, multi: true }]
    }
  }
  static forChild(): ModuleWithProviders<DisableDuringAjaxModule> {
    return {
      ngModule: DisableDuringAjaxModule,
      providers: [DisableDuringAjaxService, { provide: HTTP_INTERCEPTORS, useClass: DisableDuringAjaxInterceptor, multi: true }]
    }
  }
}
