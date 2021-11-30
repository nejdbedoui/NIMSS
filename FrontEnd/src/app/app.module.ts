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
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailsComponent } from './components/details.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFireModule} from '@angular/fire';
import { SignUpComponent } from './components/sign-up.component';



@NgModule({
  declarations: [
    AppComponent,
    ProblemComponent,
    CreateproblemComponent,
    DashbordComponent,
    HomeComponent,
    LoginComponent,
    DetailsComponent,
    SignUpComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ScrollingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDIH51E4N0-u4BcvPfRJf-erxnPUV-2C5A",
      authDomain: "nimss-7df5a.firebaseapp.com",
      projectId: "nimss-7df5a",
      storageBucket: "nimss-7df5a.appspot.com",
      messagingSenderId: "890352696831",
      appId: "1:890352696831:web:1ceda300d18d1dbe307bca",
      measurementId: "G-7L0J935EWV"
    }),
    AngularFireStorageModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
