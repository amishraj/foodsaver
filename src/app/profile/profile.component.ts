import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../auth/auth.service';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantService } from '../restaurants/restaurant.service';
import { Reservation } from '../interfaces/reservation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private restaurantService: RestaurantService) { }

  activeTab: string = 'History';
  modalVerifyIsActive = false;
  modalMealIsActive = false;
  myRestaurants?: Restaurant[];
  selected!: string;
  isVerified!: Boolean;
  displayVerifyTag: Boolean = false;

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  user: User = {
    fname: '',
    lname: '',
    email: '',
    address: '',
    phone: '',
    status: '',
    type: '',
    ongoingReservations: [],
    historyReservations: [],
    canceledReservations: []
  }

  ongoingReservations!: Reservation[]
  canceledReservations!: Reservation[]

  ngOnInit() {
    this.user = {
      fname: '',
      lname: '',
      email: '',
      address: '',
      phone: '',
      status: '',
      type: '',
      ongoingReservations: [],
      historyReservations: [],
      canceledReservations: []
    }

    this.authService.getCurrentUser().subscribe(
      (user: User) => {
        this.user = user;

        //set active tabs
        if (this.user.type === "user") {
          this.setActiveTab("Ongoing");
        } else {
          this.setActiveTab("MyRestaurants");
          this.restaurantService.getMyRestaurants(user.email).subscribe(
            (data) => {
              this.myRestaurants = data.restaurants;
            },
            (error) => {
              console.error('Error fetching restaurants:', error);
            }
          )
        }
        this.isVerified = user.status === "verified" ? true : false;
        this.displayVerifyTag = true;
      },
      (error) => {
        console.error(error);
      }
    );

    //fetch ongoing reservations
    this.authService.getReservations().subscribe(
      (data) => {
        this.ongoingReservations = data.ongoingReservations
      },
      (error) => {
        console.error(error)
      }
    )

    //fetch canceled reservations
    this.authService.getCanceledReservations().subscribe(
      (data) => {
        this.canceledReservations = data.canceledReservations
      },
      (error) => {
        console.error(error)
      }
    )
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

    //verify the account
    this.authService.verifyUser().subscribe(
      (data) => {
        alert(data.message)
        window.location.reload();
      },
      (error) => {
        alert("Couldn't verify your account. Please try again later.")
        console.error(error)
      }
    );
  }

  //Meal Modal Methods
  openModalMeal(restaurant: Restaurant) {
    this.modalMealIsActive = true;
    this.selected = restaurant.title;
  }

  closeModalMeal() {
    this.modalMealIsActive = false;
    this.selected = '';
  }

  saveMealChanges() {
    // Add your logic to handle saving changes
    this.closeModalMeal(); // Optionally close the modal after saving changes
  }

  showMeals(restaurant: Restaurant) {
    //TBD
  }

  mealAdded($event: boolean) {
    if ($event) {
      this.closeModalMeal();
    }
    window.location.reload();
  }
}
