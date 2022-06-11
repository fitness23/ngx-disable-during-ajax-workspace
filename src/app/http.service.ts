import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, catchError, throwError } from 'rxjs';


@Injectable()
export class HttpService {

    constructor(private http: HttpClient) {
    }
    
    getApi(){
        return "https://deelay.me/1000/https://pokeapi.co/api/v2"; // Deliberately delay the api response so we can see the button getting disabled
    }
    
      getWaterPokemon(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.getApi()}/type/5`,  { responseType: 'json'/*, headers: new HttpHeaders().set("NgxDisableDuringAjaxSkip", "true")*/ })
            .pipe(
              catchError((err) => {
                return this.errorHandler(err);
              }),
              map((clients: any) =>
                clients.pokemon.map((client: any) => client.pokemon)
              )
            );
      }
    
      errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'server error.');
      }

}