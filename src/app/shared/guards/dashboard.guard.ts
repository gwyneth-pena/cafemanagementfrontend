import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
class DashboardGuardService{

  constructor(private router: Router,
    private jwtHelperService: JwtHelperService){
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.jwtHelperService.isTokenExpired()){
        this.router.navigate(['/cafe/dashboard']);
        return false;
      }else{
        return true;
      }
    }
}

export const DashboardGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(DashboardGuardService).canActivate(next, state);
}

