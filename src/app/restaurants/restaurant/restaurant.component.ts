import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MEALS } from 'src/app/interfaces/dummy/meals';
import { Restaurant } from 'src/app/interfaces/restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit{

  restaurant: any;
  showVegetarian:boolean=false;
  showVegan:boolean=false;
  showGlutenFree:boolean=false;
  meals=MEALS

  constructor(private route: ActivatedRoute, private renderer: Renderer2) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.restaurant = history.state.restaurant;
      }
    });

    this.meals.sort((a, b) => b.rating - a.rating);
  }

  ngOnInit(): void {
    this.scrollToTop();
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
    if (this.restaurant.rating! >= 4.5 && this.restaurant.rating!<= 5) {
      return 'green-background'; // Green for rating 5
    } else if (this.restaurant.rating! >= 2 && this.restaurant.rating! <= 3) {
      return 'orange-background'; // Orange/Yellow for ratings 2 to 4
    } else if (this.restaurant.rating! >= 0 && this.restaurant.rating! <= 2) {
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

  applyFilters(){
    
  }
}
