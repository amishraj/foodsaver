import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurants/restaurant.service';
import { Meal } from '../interfaces/meal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  meals!:Meal[];

  constructor(private restaurantService: RestaurantService){

  }
  ngOnInit(): void {
    this.getAllMeals();
  }

  getAllMeals(): void {
    this.restaurantService.getAllMeals().subscribe(
      (meals: Meal[]) => {
        this.meals = meals;
        this.meals.sort((a, b) => b.rating - a.rating);
      },
      (error) => {
        console.error('Error fetching meals:', error);
      }
    );
  }



}
