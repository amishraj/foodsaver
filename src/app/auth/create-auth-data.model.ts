import { Reservation } from "../interfaces/reservation";

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
    canceledReservations:Reservation[]
}