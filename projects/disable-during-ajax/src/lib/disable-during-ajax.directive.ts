import { OnDestroy, OnInit, Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { DisableDuringAjaxService } from './disable-during-ajax.service';
import { Subscription, Subject, takeUntil } from 'rxjs';

@Directive({
    selector: '[ngx-disable-during-ajax]'
})

export class DisableDuringAjaxDirective implements OnDestroy, OnInit {

    private ngUnsubscribe: Subject<any> = new Subject();

    @Input() formValid: any;
    
    subscription: Subscription | undefined;

    constructor(private _busyService: DisableDuringAjaxService, private el: ElementRef) {}


    checkFormValidation(form: any)
    {
        if ((form.valid === true)) {
            this.checkAjaxProgress();
        }
        if ((form.valid === false)) {
            this.el.nativeElement.classList.add("ngx-disable-during-ajax-disabled");
        }
    }

    checkAjaxProgress()
    {

        this.subscription = this._busyService.busy$
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            response => {

                if ((response === true)) {
                    this.el.nativeElement.classList.add("ngx-disable-during-ajax-disabled");
                }

                if ((response === false)) {
                    this.el.nativeElement.classList.remove("ngx-disable-during-ajax-disabled");
                }

                // Check form one more time
                if ((this.formValid != null)) {
                    if ((this.formValid.valid === false)) {
                        this.el.nativeElement.classList.add("ngx-disable-during-ajax-disabled");
                    }
                }

            }
            );
    }

    doChecks()
    {
        // If there is no form to check validation then just check the ajax progress
        if ((this.formValid == null)) {
            this.checkAjaxProgress();
        }
        // Else check the forms validation AND ajax progress
        else {
            this.checkFormValidation(this.formValid);
            this.formValid.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: any) => this.checkFormValidation(this.formValid));
        }
    }

    ngOnInit() {
        this.doChecks();
    }

    ngOnChanges(changes: SimpleChanges)
    {
        this.doChecks();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(null);
        this.ngUnsubscribe.complete();
    }

}