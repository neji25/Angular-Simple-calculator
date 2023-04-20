import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { DataServiceService } from '../services/data-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private dataService: DataServiceService, private router: Router) { }
  
  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.dataService.isLoggedIn()){
        return true
      } else {
        this.router.navigate([''])
        return false
      }
  }
}
