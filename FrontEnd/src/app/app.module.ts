import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProblemComponent } from './components/problem.component';
import { FormsModule } from '@angular/forms';
import { CreateproblemComponent } from './components/createproblem.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashbordComponent } from './components/dashbord.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './components/details.component';



@NgModule({
  declarations: [
    AppComponent,
    ProblemComponent,
    CreateproblemComponent,
    DashbordComponent,
    HomeComponent,
    LoginComponent,
    DetailsComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
