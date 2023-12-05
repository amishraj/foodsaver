import { Reservation } from "../interfaces/reservation";
import { Waitlisting } from "../interfaces/waitlisting";

export interface CreateAuthData{
    email: string;
    password: string;
    firstName:string;
    lastName:string;
    address:string;
    phone:string;
    status:string,
    type:string,
    ongoingReservations:Reservation[],
    historyReservations:Reservation[],
    canceledReservations:Reservation[],
    ongoingWaitlistings:Waitlisting[],
    historyWaitlistings:Waitlisting[],
    canceledWaitlistings:Waitlisting[]
}