import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../auth/auth.service';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantService } from '../restaurants/restaurant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  constructor(private authService: AuthService, private restaurantService: RestaurantService){}

  activeTab: string = 'History';
  modalVerifyIsActive = false;
  modalMealIsActive = false;
  myRestaurants?:Restaurant[];
  selected!:string;

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  user:User={
    fname:'',
    lname:'',
    email:'',
    address:'',
    phone:'',
    status:''
  }

  ngOnInit() {
    this.user ={
      fname:'',
      lname:'',
      email:'',
      address:'',
      phone:'',
      status:''
    }

    this.authService.getCurrentUser().subscribe(
      (user: User) => {
        this.user = user;
        this.restaurantService.getMyRestaurants(user.email).subscribe(
          (data)=>{
            this.myRestaurants= data.restaurants;
          },
          (error)=>{
            console.error('Error fetching restaurants:', error);
          }
        )
      },
      (error) => {
        console.error(error);
        // Handle the error if needed
      }
    );
  }

  //Get verified Modal Methods

  openModalGetVerified() {
    this.modalVerifyIsActive = true;
  }

  closeModalGetVerified() {
    this.modalVerifyIsActive = false;
  }

  saveChanges() {
    // Add your logic to handle saving changes
    this.closeModalGetVerified(); // Optionally close the modal after saving changes
  }

  //Meal Modal Methods
  openModalMeal(restaurant:Restaurant) {
    this.modalMealIsActive = true;
    this.selected= restaurant.title;
  }

  closeModalMeal() {
    this.modalMealIsActive = false;
    this.selected='';
  }

  saveMealChanges() {
    // Add your logic to handle saving changes
    this.closeModalMeal(); // Optionally close the modal after saving changes
  }

  showMeals(restaurant:Restaurant){
    
  }
}
