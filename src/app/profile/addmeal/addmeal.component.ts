import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from 'src/app/interfaces/meal';
import { RestaurantService } from 'src/app/restaurants/restaurant.service';

@Component({
  selector: 'app-addmeal',
  templateUrl: './addmeal.component.html',
  styleUrls: ['./addmeal.component.scss']
})
export class AddmealComponent implements OnInit{

  @Input() restaurantTitle!:string;
  @Output() close = new EventEmitter<boolean>();

  constructor(private restaurantService:RestaurantService){}

  ngOnInit(): void {
  }

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
          alert("Added meal Successfully")
          this.close.emit(true);
        },
        (error)=>{
          console.error("Error during adding the meal: "+error);
          alert("Error during adding the meal: Please try again")
          this.close.emit(true);
        }
      )
    }
  }

}
