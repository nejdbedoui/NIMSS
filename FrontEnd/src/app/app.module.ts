import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProblemComponent } from './compnents/problem.component';
import { FormsModule } from '@angular/forms';
import { CreateproblemComponent } from './compnents/createproblem.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemComponent,
    CreateproblemComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
