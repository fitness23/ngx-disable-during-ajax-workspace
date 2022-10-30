import { OnDestroy, OnInit, Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { DisableDuringAjaxService } from './disable-during-ajax.service';
import { Subscription, Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Directive({
    selector: '[ngxDisableDuringAjax]'
})

export class DisableDuringAjaxDirective implements OnDestroy, OnInit {

    private ngUnsubscribe: Subject<any> = new Subject();
    @Input('ngxDisableDuringAjax') formInstance?: FormGroup;
    subscription!: Subscription;

    constructor(private _busyService: DisableDuringAjaxService, private el: ElementRef) {}


    checkFormValidation()
    {
        if ((this.formInstance!.valid === true)) {
            this.checkAjaxProgress();
        }
        if ((this.formInstance!.valid === false)) {
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
                if ((this.formInstance != null)) {
                    if ((this.formInstance.valid === false)) {
                        this.el.nativeElement.classList.add("ngx-disable-during-ajax-disabled");
                    }
                }

            }
            );
    }

    doChecks()
    {
        // If there is no form to check validation then just check the ajax progress
        if ((this.formInstance == null)) {
            this.checkAjaxProgress();
        }
        // Else check the forms validation AND ajax progress
        else {
            this.checkFormValidation();
            this.formInstance.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: any) => this.checkFormValidation());
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