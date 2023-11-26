import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from '../interfaces/reservation';
import { RestaurantService } from '../restaurants/restaurant.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  @Input() reservation!: Reservation;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.restaurantService.cancel(this.reservation);
  }

}
