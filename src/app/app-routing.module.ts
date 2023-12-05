import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PartnerComponent } from './partner/partner.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowseMealsComponent } from './browse-meals/browse-meals.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'partner', component: PartnerComponent},
  { path: 'review', component:ReviewComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'browse-meals', component: BrowseMealsComponent},
  { path: 'restaurants', component:RestaurantsComponent},
  { path: 'restaurant/:id', component:RestaurantComponent},
  { path: 'about', component:AboutComponent},
  { path: 'profile', component:ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }