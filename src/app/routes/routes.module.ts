import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AuthGuardService } from '../services/auth-guard.service'
import { DashboardComponent } from '../components/dashboard/dashboard.component'

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]}
]



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
