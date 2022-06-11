import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DisableDuringAjaxModule } from 'disable-during-ajax';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { HttpService } from "./http.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DisableDuringAjaxModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
