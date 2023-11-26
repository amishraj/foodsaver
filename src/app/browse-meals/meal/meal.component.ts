import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/interfaces/reservation';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { User } from 'src/app/interfaces/user';
import { RestaurantService } from 'src/app/restaurants/restaurant.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  @Input() title!: string;
  @Input() description!: string;
  @Input() rating!: number;
  @Input() zipcode!: string;
  @Input() calories!: number;
  @Input() image!:string;
  @Input() isVegan!: boolean;
  @Input() isVeg!: boolean;
  @Input() isGlutenFree!: boolean;
  @Input() fromRestaurant: boolean = false;
  @Input() restaurant!:Restaurant;

  timeSlots: string[] = ['12pm', '3pm', '6pm', '9pm'];
  selectedTimeSlot: string = '';
  modalReserveIsActive = false;
  currentUser!:User;
  reserveSuccess=false;

  auth=false; //is the user authed?
  verified=false; //is the user verified?

  public constructor(private authService: AuthService, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.reserveSuccess=false;
    this.authService.getCurrentUser().subscribe(
      (data)=>{
        this.currentUser=data;
        this.auth=true;

        //check verification
        if(data.status==="verified"){
          this.verified=true;
        } else{
          this.verified=false;
        }
      }, (error)=>{
        //if user not authed, disable the reserve buttons
        this.auth=false;
      }
    )
  }

  public getRatingColor(): string {
    if (this.rating! >= 4.5 && this.rating! <= 5) {
      return 'green-background'; // Green for rating 5
    } else if (this.rating! >= 2 && this.rating! <= 3) {
      return 'orange-background'; // Orange/Yellow for ratings 2 to 4
    } else if (this.rating! >= 0 && this.rating! <= 2) {
      return 'red-background'; // Red for ratings 0 and 1
    } else {
      return '#FFFFFF'; // Default color
    }
  }

  openModalReserve() {
    this.modalReserveIsActive = true;
  }

  closeModalReserve() {
    this.modalReserveIsActive = false;
    this.reserveSuccess=false;
  }

  selectTimeSlot(slot: string) {
    this.selectedTimeSlot = slot;
  }
  confirmReservation() {
    //check if auth
    if (!this.authService.getIsAuth()) {
      console.error("user not authorized")
    }

    //authed user can continue
    let newReservation: Reservation = {
      meal: {
        title: this.title,
        description: this.description,
        zipcode: this.zipcode,
        calories: this.calories,
        rating: this.rating,
        image: this.image,
        glutenFree: this.isGlutenFree,
        vegan: this.isVegan,
        vegetarian: this.isVeg,
        status:'open'
      },
      restaurant:this.restaurant.title,
      reservationTime: this.selectedTimeSlot,
      user: this.currentUser
    };

    this.restaurantService.reserve(newReservation).subscribe(
      (data)=>{
        console.log(data)
        this.reserveSuccess=true;
      },
      (error)=>{
        console.error(error)
      }
    );
  }
}
