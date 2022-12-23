import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DisableDuringAjaxModule } from 'disable-during-ajax';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from "./http.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DisableDuringAjaxModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
