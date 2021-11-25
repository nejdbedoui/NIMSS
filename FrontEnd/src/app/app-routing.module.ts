import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemComponent } from './components/problem.component';
import { CreateproblemComponent } from './components/createproblem.component';
import { DashbordComponent } from './components/dashbord.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { DetailsComponent } from './components/details.component';




const routes: Routes = [
  {path: 'list',component : ProblemComponent},
  {path: 'add',component : CreateproblemComponent},
  {path: 'dashbord',component : DashbordComponent},
  {path: 'login',component : LoginComponent},
  {path: 'Details/:id',component : DetailsComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
