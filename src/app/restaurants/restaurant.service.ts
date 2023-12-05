import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Meal } from '../interfaces/meal';
import { Reservation } from '../interfaces/reservation';
import { Waitlisting } from '../interfaces/waitlisting';
import { Restaurant } from '../interfaces/restaurant';
import { RESTAURANTS } from '../interfaces/dummy/restaurants';
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = 'http://localhost:3000/api/restaurant';
  fetchedUser:User = {
    fname: '',
    lname: '',
    email: '',
    address: '',
    phone: '',
    status: '',
    type: '',
    ongoingReservations: [],
    historyReservations: [],
    canceledReservations: [],
    ongoingWaitlistings:[],
    historyWaitlistings:[],
    canceledWaitlistings:[]
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Function to post restaurant data to the /new endpoint
  postRestaurant(restaurantData: FormData): Observable<any> {
    // Add any additional headers if needed

    return this.http.post<any>(this.apiUrl + "/new", restaurantData)
      .pipe(
        catchError(error => {
          console.error('Error occurred during restaurant creation:', error);
          return throwError(error);
        })
      );
  }

  getAllRestaurants(){
    return this.http.get<{message:string, restaurants:Restaurant[]}>(this.apiUrl)
      .pipe(
        catchError(error=>{
          console.error('Error fetching restaurants', error);
          return throwError(error);
        })
      )
  }

  getAllMeals(): Observable<Meal[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.apiUrl + "/getAllMeals", {headers:headers});
  }

  getRestaurantByMealTitle(mealTitle: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.apiUrl+"/getRestaurantByMealTitle/"+mealTitle);
  }

  //DUMMY
  // addDummyRestaurants(){
  //   let list = RESTAURANTS;
  //   let restaurants = list.map((restaurant) => {
  //     const { id, ...rest } = restaurant;
  //     return rest;
  //   });
  //   restaurants.forEach((restaurant) => {
  //     const obj= this.http.post<any>(this.apiUrl + "/dummy", restaurant)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error occurred during restaurant creation:', error);
  //         return throwError(error);
  //       })
  //     );

  //     obj.subscribe(data=>{
  //       console.log(data)
  //     })
  //   });
  // }

  getMyRestaurants(email: string) {
    const data = {
      email: email
    }
    return this.http.post<any>(this.apiUrl + "/findByEmail", data)
      .pipe(
        catchError(error => {
          console.error('Error occurred during restaurant creation:', error);
          return throwError(error);
        })
      );
  }

  getRandomImage(page: string, query:string) {
    const headers = new HttpHeaders({
      'Accept-Version': 'v1',
      'Authorization': "Client-ID LiP8e9DqYD8V_xv9LgnOXVId10_yYyZouztSleadyYg" // Add your authorization token if needed
    });

    return this.http.get<any>("https://api.unsplash.com/search/photos?page="+page+"&query="+query+"&client_id=LiP8e9DqYD8V_xv9LgnOXVId10_yYyZouztSleadyYg")
  }

  addMeal(meal:Meal, title:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const meals=[meal]

    const data = {
      title: title,
      meals: meals
    }

    return this.http.put<any>("http://localhost:3000/api/restaurant/updateMeals", data, {headers:headers})
  }

  reserve(newReservation: Reservation) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("http://localhost:3000/api/restaurant/reserve", newReservation, {headers:headers});
  }

  waitlist(newWaitlisting: Waitlisting) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("http://localhost:3000/api/restaurant/waitlist", newWaitlisting, {headers:headers});
  }

  cancel(reservation: Reservation){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.authService.getCurrentUser().subscribe(
      (user: User) => {
        // Move the logic that depends on the fetched user inside this callback
        const reservationWithUser = { ...reservation, user };
        this.http.post<any>('http://localhost:3000/api/restaurant/cancelReservation', reservationWithUser, { headers: headers })
          .subscribe(
            (response) => {
              // Handle the response from the server if needed
              alert(response.message)
              window.location.reload();
            },
            (error) => {
              // Handle errors if needed
              console.error(error);
              alert("Error occurred while cancelling the reservation")
            }
          );
      },
      (error) => {
        // Handle errors when fetching the user if needed
        console.error(error);
      }
    );
  }

  postRestaurantReview(reviewData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/reviews/restaurant`, reviewData, {headers:headers});
  }

  postMealReview(reviewData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/reviews/meal`, reviewData, {headers:headers});
  }

}
