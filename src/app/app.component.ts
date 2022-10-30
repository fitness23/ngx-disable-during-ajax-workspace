import { Component, OnInit } from '@angular/core';
import { HttpService } from "./http.service";
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  items$ = of([]) as Observable<any[]>;
  public myForm: FormGroup = this.fb.group({});

  constructor(private httpService: HttpService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  
  getWaterPokemon()
  {
    this.items$ = this.httpService.getWaterPokemon();
  }

}