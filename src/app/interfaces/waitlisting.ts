import { Meal } from "./meal";
import { Restaurant } from "./restaurant";
import { User } from "./user";

export interface Waitlisting {
    meal: Meal,
    restaurant:string,
    waitlistingTime: string,
    user: User
  }