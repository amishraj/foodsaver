import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Observable, Subject, catchError, of, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../interfaces/user";
import { CreateAuthData } from "./create-auth-data.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenTimer!: any;
    private isAuthenticated = false;
    private token!: any;
    private authStatusListener = new Subject<boolean>();

    private currentUser!: User;

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    createUser(user: User, password: string): Observable<any> {
        const authData: CreateAuthData = {
            email: user.email,
            password: password,
            firstName: user.fname,
            lastName: user.lname,
            address: user.address,
            phone: user.phone,
            status: user.status,
            type: user.type,
            ongoingReservations:[],
            historyReservations:[],
            canceledReservations:[],
            ongoingWaitlistings:[],
            historyWaitlistings:[],
            canceledWaitlistings:[]
            
        };

        return this.http.post("http://localhost:3000/api/user/signup", authData)
            .pipe(
                catchError(error => {
                    console.error('Error occurred during user creation:', error);
                    return throwError(error);
                })
            );
    }

    login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        return this.http.post<{ token: string, expiresIn: number, currUser: User }>('http://localhost:3000/api/user/login', authData)
          .pipe(
            tap(response => {
              const token = response.token;
              this.token = token;
              if (token) {
                const expiresInDuration = response.expiresIn;
                this.setAuthtimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(token, expirationDate);
    
                this.currentUser = response.currUser;
                this.router.navigate(['/']);
              }
            }),
            catchError(error => {
              this.authStatusListener.next(false);
              console.error(error);
              return throwError(error); // Sending the error back to the component
            })
          );
      }
    getCurrentUser(): Observable<User> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });

        return this.http.get<User>("http://localhost:3000/api/user/me", { headers });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();

        if (expiresIn > 0) {
            this.token = authInformation!.token;
            this.isAuthenticated = true;
            this.setAuthtimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.currentUser = {
            fname: '',
            lname: '',
            email: '',
            address: '',
            phone: '',
            status: '',
            type:'',
            ongoingReservations:[],
            historyReservations:[],
            canceledReservations:[],
            ongoingWaitlistings:[],
            historyWaitlistings:[],
            canceledWaitlistings:[],            
        };
        this.router.navigate(['/']);
    }

    private setAuthtimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

    verifyUser(){
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.post<any>("http://localhost:3000/api/user/verify", {headers:headers});
    }

    isVerified(){
        if(this.isAuthenticated){
            if(this.currentUser.status!="verified"){
                return false;
            } else{
                return true;
            }
        }
        //not auth case
        return false;
    }

    getReservations(){
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.get<any>("http://localhost:3000/api/user/getReservations", {headers:headers});
    }

    getWaitlistings(){
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.get<any>("http://localhost:3000/api/user/getWaitlistings", {headers:headers});
    }

    getCanceledReservations(){
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
        return this.http.get<any>("http://localhost:3000/api/user/getCanceledReservations", {headers:headers});
    }
}