import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemComponent } from './compnents/problem.component';
import { CreateproblemComponent } from './compnents/createproblem.component';


const routes: Routes = [
  {path: 'list',component : ProblemComponent},
  {path: 'add',component : CreateproblemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
