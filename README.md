# ngx-disable-during-ajax

This is an accessible library to style any element in your application (illustrating that it is unavailable) whilst ajax data calls are in transit.
We achieve this by applying a css class name and we avoid using the 'disabled' attribute altogether.

Stackblitz Example = https://stackblitz.com/edit/angular-ivy-fmn28n

## Description

Sometimes we may want to illustrate that buttons (or other elements) are unavailable in our application whilst ajax calls are in transit. For example the user may have filled out an order form and we wish to prevent them from accidentally pressing the submit button twice. This library listens for all the incoming and outgoing requests and adds / removes a css class where necessary.

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
    DisableDuringAjaxModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  ],
})
export class AppModule { }
```

## Styling

*Step 3*: In your global stylesheet, style the provided `ngx-disable-during-ajax-disabled` class name, eg:

```css
.ngx-disable-during-ajax-disabled{
    pointer-events: none;
    opacity: 0.5;
}
```

Please note in this library we don't use the disabled attribute since this isn't accessible for screenreaders. By providing a class name that you can style yourself gives you greater flexibility as to how those 'disabled' elements should look and behave.

## Usage

*Step 4*: Place directive on buttons you wish to disable when ajax calls are made

```bash
<button type="button" [ngxDisableDuringAjax]>My button</button>
```

Should you have buttons which are included in a form and need validation to be considered include the form name as a parameter to the tag.

```bash
<button type="button" [ngxDisableDuringAjax]="myForm">My button</button>
```

## Skipping certain api calls from disabling elements

You may have a situation where you want your button to be 'disabled' for all ajax calls with the exception of a few. For example you may have to call a 'new messages' api every 10 seconds which would affect the user's experience if buttons were going in and out of a 'disabled' state every 10 seconds. In this case, simply add a `"NgxDisableDuringAjaxSkip", "true"`, header to those http.service calls.

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