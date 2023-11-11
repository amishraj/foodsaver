import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit{

  @Input() title?:string;
  @Input() description?:string;
  @Input() rating?:number;
  @Input() isVegan?:boolean;
  @Input() isVeg?:boolean;
  @Input() isGlutenFree?:boolean;
  @Input() fromRestaurant?:boolean=false;

  public constructor(){}

  ngOnInit(): void {
  }

  public getRatingColor(): string {
    if (this.rating! >= 4.5 && this.rating!<= 5) {
      return 'green-background'; // Green for rating 5
    } else if (this.rating! >= 2 && this.rating! <= 3) {
      return 'orange-background'; // Orange/Yellow for ratings 2 to 4
    } else if (this.rating! >= 0 && this.rating! <= 2) {
      return 'red-background'; // Red for ratings 0 and 1
    } else {
      return '#FFFFFF'; // Default color
    }
  }
}
