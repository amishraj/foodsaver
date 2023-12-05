import { Reservation } from "./reservation"
import { Waitlisting } from "./waitlisting"

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
    canceledReservations:Reservation[],
    ongoingWaitlistings:Waitlisting[],
    historyWaitlistings:Waitlisting[],
    canceledWaitlistings:Waitlisting[],
}