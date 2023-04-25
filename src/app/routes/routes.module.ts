import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AuthGuardService } from '../services/auth-guard.service'
import { DashboardComponent } from '../components/dashboard/dashboard.component'
import {CalculatorComponent} from "../components/calculator/calculator.component";
import {AllPostsComponent} from "../components/blog/all-posts/all-posts.component";

const routes: Routes = [
  {path: '', component: CalculatorComponent},
  {path: 'blog', component: AllPostsComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
