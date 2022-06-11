import { Component } from '@angular/core';
import { HttpService } from "./http.service";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  items$ = of([]) as Observable<any[]>;

  constructor(private httpService: HttpService) { }
  
  getWaterPokemon()
  {
    this.items$ = this.httpService.getWaterPokemon();
  }

}