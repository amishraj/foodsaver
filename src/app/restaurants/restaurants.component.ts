import { Component } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import { RESTAURANTS } from '../interfaces/dummy/restaurants';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent {
  constructor(private router: Router){}
  
  restaurants: Restaurant[] = RESTAURANTS;

  onCardClick(restaurant: Restaurant) {
    this.router.navigate(['/restaurant', restaurant.id], {
      state: { restaurant } // Pass the selected restaurant as state to the route
    });
  }

}
