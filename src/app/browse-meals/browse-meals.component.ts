import { Component } from '@angular/core';
import { Meal } from '../interfaces/meal';
import { HttpClient } from '@angular/common/http';
import { MEALS } from '../interfaces/dummy/meals';

@Component({
  selector: 'app-browse-meals',
  templateUrl: './browse-meals.component.html',
  styleUrls: ['./browse-meals.component.scss']
})
export class BrowseMealsComponent {

  zipcode='20037';
  meals: Meal[] = MEALS;

  constructor(private http: HttpClient) { 
    this.meals.sort((a, b) => b.rating - a.rating);
  }

  ngOnInit() {
  }

}
