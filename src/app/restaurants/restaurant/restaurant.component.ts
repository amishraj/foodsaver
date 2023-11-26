import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MEALS } from 'src/app/interfaces/dummy/meals';
import { Meal } from 'src/app/interfaces/meal';
import { Restaurant } from 'src/app/interfaces/restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurant!: any;
  showVegetarian: boolean = false;
  showVegan: boolean = false;
  showGlutenFree: boolean = false;

  constructor(private route: ActivatedRoute, private renderer: Renderer2, private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.restaurant = history.state.restaurant;
      }
    });

    this.restaurant.meals.sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
  }

  ngOnInit(): void {
    this.scrollToTop();

    if (!this.restaurant) {
      this.router.navigate(['/']);
    }
  }

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

  public getRatingColor(): string {
    if (Number(this.restaurant.rating!) >= 4.5 && Number(this.restaurant.rating!) <= 5) {
      return 'green-background'; // Green for rating 5
    } else if (Number(this.restaurant.rating!) >= 2 && Number(this.restaurant.rating!) <= 3) {
      return 'orange-background'; // Orange/Yellow for ratings 2 to 4
    } else if (Number(this.restaurant.rating!) >= 0 && Number(this.restaurant.rating!) <= 2) {
      return 'red-background'; // Red for ratings 0 and 1
    } else {
      return '#FFFFFF'; // Default color
    }
  }

  scrollToTop() {
    // Use Renderer2 to set the scrollTop property of the document body and document documentElement to 0
    this.renderer.setProperty(document.body, 'scrollTop', 0);
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }

  applyFilters() {
    let meals:Meal[]= this.restaurant.meals;
    if(!this.showGlutenFree && !this.showVegan && !this.showVegetarian){
      window.location.reload();
    }
    const filteredMeals = meals.filter(meal => {
      return (!this.showVegetarian || meal.vegetarian) &&
        (!this.showVegan || meal.vegan) &&
        (!this.showGlutenFree || meal.glutenFree);
    })
    filteredMeals.sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);

    this.restaurant.meals = filteredMeals;
  }
}
