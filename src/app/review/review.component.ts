import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantService } from '../restaurants/restaurant.service';
import { Meal } from '../interfaces/meal';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  
  constructor(private restaurantService: RestaurantService){}

  restaurants!:Restaurant[];
  selectedRestaurantTitle!: any;
  selectedRestaurant!: any;

  meals!:Meal[];
  selectedMeal!: any;
  selectedMealObj!:any;

  currentRating: number = 0; // Property to hold the star rating
  reviewComment: string = ''; // Property to hold the review comment

  showReviewCard=false;

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (data)=>{
        this.restaurants = data.restaurants;
      },
      (error)=>{
        console.error(error);
        alert("Error occurred while fetching restaurants");
      }
    )
  }

  selectRestaurant() {
    this.selectedRestaurant = this.restaurants.find(restaurant => restaurant.title === this.selectedRestaurantTitle);
    this.meals= this.selectedRestaurant.meals;
    this.showReviewCard= true;
  }

  selectMeal() {
    this.selectedMealObj = this.selectedRestaurant.meals.find((meal: { title: any; }) => meal.title === this.selectedMeal);
    this.showReviewCard= true;
  }

  submitReview(stars: number, comment: string) {
    // const review = {
    //   restaurantId: this.selectedRestaurant.id,
    //   mealId: this.selectedMeal ? this.selectedMeal._id : null,
    //   stars,
    //   comment
    // };
  }

  onRatingReceived(rating: number) {
    this.currentRating = rating;
  }

  submitRating() {
    if(this.selectedMeal){
      //review meal
      const reviewData = {
        restaurantTitle: this.selectedRestaurantTitle,
        meal: this.selectedMeal,
        rating: this.currentRating.toString(),
        comment: this.reviewComment
      };

      this.restaurantService.postMealReview(reviewData).subscribe(response => {
        console.log(response); // Handle response
        this.resetForm();
        window.location.reload();
      });
    } else{
      //review restaurant
      const reviewData = {
        restaurantTitle: this.selectedRestaurantTitle,
        rating: this.currentRating.toString(),
        comment: this.reviewComment
      };

      this.restaurantService.postRestaurantReview(reviewData).subscribe(response => {
        console.log(response); // Handle response
        this.resetForm();
        window.location.reload();
      });
    }
  }

  resetForm() {
    this.currentRating = 0;
    this.reviewComment = '';
    // Reset other form elements if necessary
  }

  cancel(){
    window.location.reload();
  }
}
