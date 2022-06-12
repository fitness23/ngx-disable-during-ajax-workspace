# ngx-disable-during-ajax

This is a library to disable any element in your application using the native disabled attribute whilst ajax data calls are in transit.

Stackblitz Example = https://stackblitz.com/edit/angular-ivy-fmn28n

## Description

Sometimes we may want to disable buttons (or other elements) in our application whilst ajax calls are in transit. For example the user may have filled out an order form and we wish to prevent them from accidentally pressing the submit button twice. This library listens for all the incoming and outgoing requests and enables the button once all ajax calls have completed.

## Get Started

*Step 1*: install `ngx-disable-during-ajax`

```bash
npm i ngx-disable-during-ajax
```

*Step 2*: Import `DisableDuringAjaxModule` into your app module, eg.:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DisableDuringAjaxModule } from 'ngx-disable-during-ajax';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DisableDuringAjaxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  ],
})
export class AppModule { }
```

## Usage

*Step 3*: Place directive on buttons you wish to disable when ajax calls are made

```bash
<button type="button" ngx-disable-during-ajax></button>
```

Should you have buttons which are included in a form and need validation to be considered add the `[formValid]` tag and send the instance of the form.

```bash
<button type="button" ngx-disable-during-ajax [formValid]="myForm"></button>
```

You may have a situation where you want your button to be disabled for all ajax calls with the exception of a few. In this case, simply add a `"NgxDisableDuringAjaxSkip", "true"`, header to those http.service calls.

```bash
getWaterPokemon(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.getApi()}/type/5`,  { responseType: 'json', headers: new HttpHeaders().set("NgxDisableDuringAjaxSkip", "true") })
            .pipe(
              catchError((err) => {
                return this.errorHandler(err);
              }),
              map((clients: any) =>
                clients.pokemon.map((client: any) => client.pokemon)
              )
            );
      }
```