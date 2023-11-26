import { Meal } from "./meal";
import { Restaurant } from "./restaurant";
import { User } from "./user";

export interface Reservation {
    meal: Meal,
    restaurant:string,
    reservationTime: string,
    user: User
  }