import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from 'src/app/interfaces/meal';
import { RestaurantService } from 'src/app/restaurants/restaurant.service';

@Component({
  selector: 'app-addmeal',
  templateUrl: './addmeal.component.html',
  styleUrls: ['./addmeal.component.scss']
})
export class AddmealComponent {

  @Input() restaurantTitle!:string;

  constructor(private restaurantService:RestaurantService){}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const mealObject:Meal={
        title: form.value.title,
        description: form.value.description,
        zipcode: form.value.zipcode,
        calories: form.value.calories,
        rating: 3.0,
        image: "https://example.com/image.jpg",
        glutenFree: form.value.glutenFree,
        vegan: form.value.vegan,
        vegetarian: form.value.vegetarian,
        status:"open"
      }

      this.restaurantService.addMeal(mealObject, this.restaurantTitle).subscribe(
        (data)=>{
          //handle successful add meal
        },
        (error)=>{
          console.error("Error during adding the meal: "+error);
        }
      )
    }
  }

}
