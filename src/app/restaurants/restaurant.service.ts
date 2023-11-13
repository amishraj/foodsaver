import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Meal } from '../interfaces/meal';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/api/restaurant';

  constructor(private http: HttpClient) { }

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

  getRandomImage(page: string) {
    const headers = new HttpHeaders({
      'Accept-Version': 'v1',
      'Authorization': "Client-ID LiP8e9DqYD8V_xv9LgnOXVId10_yYyZouztSleadyYg" // Add your authorization token if needed
    });
    return this.http.get<any>("https://api.unsplash.com/search/photos?page="+page+"&query=restaurant&client_id=LiP8e9DqYD8V_xv9LgnOXVId10_yYyZouztSleadyYg")
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
}
