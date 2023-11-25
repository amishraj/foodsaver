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
  
  restaurants: Restaurant[] = RESTAURANTS;
  randomUrls:string[]=[]

  ngOnInit(): void {
  }

  onCardClick(restaurant: Restaurant) {
    this.router.navigate(['/restaurant', restaurant.id], {
      state: { restaurant } // Pass the selected restaurant as state to the route
    });
  }

  // getRandomImageUrl(){
  //   const randomPage = Math.floor(Math.random() * 200) + 1; 

  //   const randomPhoto = Math.floor(Math.random() * 10) + 1;

  //   this.restaurantService.getRandomImage(randomPage.toString()).subscribe(
  //     data => {
  //       // Handle the data (data will contain the response from the API)
  //       console.log(data.results[randomPhoto].urls.regular);
  //       this.randomUrls.push(data.results[randomPhoto].urls.regular)
  //     },
  //     error => {
  //       // Handle errors
  //       console.error(error);
  //     }
  //   );
  // }

}
