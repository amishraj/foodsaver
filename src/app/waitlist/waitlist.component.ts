import { Component, Input, OnInit } from '@angular/core';
import { Waitlisting } from '../interfaces/waitlisting';
import { RestaurantService } from '../restaurants/restaurant.service';
@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss']
})
export class WaitlistComponent {
  @Input() waitlisting!: Waitlisting;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  // cancel() {
  //   this.restaurantService.cancel(waitlisting);
  // }
}
