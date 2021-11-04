import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemComponent } from './components/problem.component';
import { CreateproblemComponent } from './components/createproblem.component';
import { DashbordComponent } from './components/dashbord.component';


const routes: Routes = [
  {path: 'list',component : ProblemComponent},
  {path: 'add',component : CreateproblemComponent},
  {path: 'dashbord',component : DashbordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
