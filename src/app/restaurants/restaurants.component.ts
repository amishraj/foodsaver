import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import { RESTAURANTS } from '../interfaces/dummy/restaurants';
import { NavigationExtras, Router } from '@angular/router';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit{
  constructor(private router: Router, private restaurantService: RestaurantService){}
  
  restaurants!: Restaurant[];
  randomUrls:string[]=[]

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (data)=>{
        this.restaurants=data.restaurants;
      },
      (error)=>{
        console.error(error)
      }
    )
  }

  onCardClick(restaurant: Restaurant) {
    this.router.navigate(['/restaurant', restaurant.id], {
      state: { restaurant } // Pass the selected restaurant as state to the route
    });
  }

}
