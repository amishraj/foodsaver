import { Restaurant } from "./restaurant"

export interface Meal{
    title: string,
    description:string,
    zipcode: string,
    calories:number,
    rating:number,
    image:string,
    glutenFree:boolean,
    vegan:boolean,
    vegetarian:boolean
}