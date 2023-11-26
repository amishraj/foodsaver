import { Reservation } from "./reservation"

export interface User{
    fname:string,
    lname:string,
    email:string,
    address:string,
    phone:string
    status:string,
    type:string,
    ongoingReservations:Reservation[],
    historyReservations:Reservation[],
    canceledReservations:Reservation[]
}