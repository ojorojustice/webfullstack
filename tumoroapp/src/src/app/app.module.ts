import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterPlacesComponent } from './components/register-places/register-places.component';
import { ReportComponent } from './components/report/report.component';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule
import { ValidateService } from './services/validate.service';
import { AuthenticateService } from './services/authenticate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ProfileComponent } from './components/profile/profile.component';
import { PlacesEditComponent } from './components/register-places/places-edit/places-edit.component';
import { PlacesItemComponent } from './components/register-places/places-item/places-item.component';
import { PlacesDetailComponent } from './components/register-places/places-detail/places-detail.component';
import { PlacesListComponent } from './components/register-places/places-list/places-list.component';
import { PlaceFilterPipe } from './components/register-places/place-filter.pipe';






const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register-places', component: RegisterPlacesComponent },
  { path: 'report', component: ReportComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'places',component:RegisterPlacesComponent , children:[{path:'new', component: PlacesEditComponent},{path:':id', component:PlacesDetailComponent},{path:':id/edit', component:PlacesEditComponent}]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RegisterPlacesComponent,
    ReportComponent,
    ProfileComponent,
    PlacesEditComponent,
    PlacesItemComponent,
    PlacesDetailComponent,
    PlacesListComponent,
    PlaceFilterPipe,  
     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()    
  ],
  providers: [ValidateService, AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
