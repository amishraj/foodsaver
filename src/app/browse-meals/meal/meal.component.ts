import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/interfaces/reservation';
import { Waitlisting } from 'src/app/interfaces/waitlisting';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { User } from 'src/app/interfaces/user';
import { RestaurantService } from 'src/app/restaurants/restaurant.service';
import { HttpClient } from '@angular/common/http';

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
  @Input() image!: string;
  @Input() isVegan!: boolean;
  @Input() isVeg!: boolean;
  @Input() isGlutenFree!: boolean;
  @Input() fromRestaurant: boolean = false;
  @Input() restaurant!: Restaurant;
  @Input() status!: string;

  imageUrl!:string;

  timeSlots: string[] = ['12pm', '3pm', '6pm', '9pm'];
  selectedTimeSlot: string = '';
  modalReserveIsActive = false;
  modalWaitlistIsActive = false;
  currentUser!: User;
  reserveSuccess = false;
  waitlistSuccess = false;

  auth = false; //is the user authed?
  verified = false; //is the user verified?
  userType = ''; //is the user a partner/user?
  jsonFileData!: any;

  public constructor(private http: HttpClient, private authService: AuthService, private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.reserveSuccess = false;
    this.waitlistSuccess = false;
    this.authService.getCurrentUser().subscribe(
      (data) => {
        this.currentUser = data;
        this.auth = true;

        //check verification
        if (data.status === "verified") {
          this.verified = true;
        } else {
          this.verified = false;
        }

        //check user type
        this.userType = data.type;
      }, (error) => {
        //if user not authed, disable the reserve buttons
        this.auth = false;
      }
    )

    // this.http.get('src/app/interfaces/meal_images.json').subscribe((data) => {
    //   this.jsonFileData = data;

    //   // Check if the meal title exists in the JSON data
    //   if (this.jsonFileData.hasOwnProperty(this.title)) {
    //     const imageUrl = this.jsonFileData[this.title];
    //     // Use the image URL
    //     console.log('Meal Image URL:', imageUrl);
    //   } else {
    //     // If the meal title doesn't exist, call your restaurant service method
    //     this.restaurantService.getRandomImage("130", this.title).subscribe(
    //       (data)=>{
    //         console.log(data);
    //         //this.jsonFileData[this.title] = randomImageUrl;
    //         //this.saveUpdatedJsonFile();
          
    //         //console.log('Random Image URL:', randomImageUrl);
    //       }
    //     );
    //   }
    // });
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

  openModalWaitlist() {
    this.modalWaitlistIsActive = true;
  }

  closeModalReserve() {
    this.modalReserveIsActive = false;
    this.reserveSuccess = false;
  }

  closeModalWaitlist(){
    this.modalWaitlistIsActive = false;
    this.waitlistSuccess = false;
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
    if(!this.restaurant){
      //search for restaurant
      this.restaurantService.getRestaurantByMealTitle(this.title).subscribe(
        (data)=>{
          this.restaurant=data;
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
              status: 'open',
            },
            restaurant: this.restaurant.title,
            reservationTime: this.selectedTimeSlot,
            user: this.currentUser
          };
      
          this.restaurantService.reserve(newReservation).subscribe(
            (data) => {
              console.log(data)
              this.reserveSuccess = true;
            },
            (error) => {
              console.error(error)
              alert("Error during reservation")
            }
          );
        },
        (error)=>{
          alert("Error encountered. Please try again later")
        })
    }
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
        status: 'open',
      },
      restaurant: this.restaurant.title,
      reservationTime: this.selectedTimeSlot,
      user: this.currentUser
    };

    this.restaurantService.reserve(newReservation).subscribe(
      (data) => {
        console.log(data)
        this.reserveSuccess = true;
      },
      (error) => {
        console.error(error)
        alert("Error during reservation")
      }
    );
  }


  confirmWaitlisting() {
    //check if auth
    if (!this.authService.getIsAuth()) {
      console.error("user not authorized")
    }
    //authed user can continue
    let newWaitlisting: Waitlisting = {
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
        status: 'open'
      },
      restaurant: this.restaurant.title,
      waitlistingTime: this.selectedTimeSlot,
      user: this.currentUser
    };

    this.restaurantService.waitlist(newWaitlisting).subscribe(
      (data) => {
        console.log(data)
        this.waitlistSuccess = true;
      },
      (error) => {
        console.error(error)
        alert("Error during waitlist")
      }
    );
  }
}







