import { Component } from '@angular/core';
import { Meal } from '../interfaces/meal';
import { HttpClient } from '@angular/common/http';
import { MEALS } from '../interfaces/dummy/meals';
import { RestaurantService } from '../restaurants/restaurant.service';

@Component({
  selector: 'app-browse-meals',
  templateUrl: './browse-meals.component.html',
  styleUrls: ['./browse-meals.component.scss']
})
export class BrowseMealsComponent {

  zipcode='20037';
  meals!: Meal[];
  showVegetarian: boolean = false;
  showVegan: boolean = false;
  showGlutenFree: boolean = false;

  toggleFilter(filter: string) {
    if (filter === 'vegetarian') {
      this.showVegetarian = !this.showVegetarian;
    } else if (filter === 'vegan') {
      this.showVegan = !this.showVegan;
    } else if (filter === 'glutenFree') {
      this.showGlutenFree = !this.showGlutenFree;
    }

    // You can add more logic for other filters here if needed
  }

  constructor(private http: HttpClient, private restaurantService: RestaurantService) { 
  }

  ngOnInit() {
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

  applyFilters() {
    if(!this.showGlutenFree && !this.showVegan && !this.showVegetarian){
      window.location.reload();
    }
    const filteredMeals = this.meals.filter(meal => {
      return (!this.showVegetarian || meal.vegetarian) &&
        (!this.showVegan || meal.vegan) &&
        (!this.showGlutenFree || meal.glutenFree);
    })
    filteredMeals.sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);

    this.meals = filteredMeals;
  }

}
