import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from '../interfaces/reservation';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit{

  @Input() reservation!:Reservation;

  constructor(){}

  ngOnInit(): void {
  }

}
