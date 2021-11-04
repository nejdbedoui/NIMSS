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


@NgModule({
  declarations: [
    AppComponent,
    ProblemComponent,
    CreateproblemComponent,
    DashbordComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
