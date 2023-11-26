import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HowitworksComponent } from './home/howitworks/howitworks.component';
import { PartnerComponent } from './partner/partner.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowseMealsComponent } from './browse-meals/browse-meals.component';
import { MealComponent } from './browse-meals/meal/meal.component';
import { AboutComponent } from './about/about.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ProfileComponent } from './profile/profile.component';
import { AddmealComponent } from './profile/addmeal/addmeal.component';
import { ReserveComponent } from './reserve/reserve.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    HowitworksComponent,
    PartnerComponent,
    LoginComponent,
    SignupComponent,
    BrowseMealsComponent,
    MealComponent,
    AboutComponent,
    RestaurantsComponent,
    RestaurantComponent,
    ProfileComponent,
    AddmealComponent,
    ReserveComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
