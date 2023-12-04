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
  @Input() canceled!: boolean;
  isCancelModalActive: boolean = false;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  confirmCancel() {
    this.restaurantService.cancel(this.reservation);
    this.closeCancelModal();
  }
  openCancelModal() {
    this.isCancelModalActive = true;
  }

  closeCancelModal() {
    this.isCancelModalActive = false;
  }

}
