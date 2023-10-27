import { Component } from '@angular/core';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {

  title='tofu curry';
  description='Delicious meal prepared by our finest chefs';
  

  public constructor(){}

  ngOnInit(){

  } 
}
