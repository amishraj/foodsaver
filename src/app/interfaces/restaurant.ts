import { Meal } from "./meal"

export interface Restaurant{
    id:number
    title:string,
    address:string,
    phone:string,
    email:string,
    rating:string,
    meals:Meal[]
}