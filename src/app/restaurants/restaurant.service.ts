import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/api/restaurant/new';

  constructor(private http: HttpClient) {}

  // Function to post restaurant data to the /new endpoint
  postRestaurant(restaurantData: FormData): Observable<any> {
    // Add any additional headers if needed

    return this.http.post<any>(this.apiUrl, restaurantData)
      .pipe(
        catchError(error => {
          console.error('Error occurred during restaurant creation:', error);
          return throwError(error);
        })
      );
  }
}
