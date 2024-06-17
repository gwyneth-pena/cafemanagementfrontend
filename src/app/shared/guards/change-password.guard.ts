import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ChangePassGuardService{

  constructor(private jwtHelperService: JwtHelperService){
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.jwtHelperService.isTokenExpired()){
        return true;
      }else{
        return false;
      }
    }
  
}

export const ChangePasswordGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(ChangePassGuardService).canActivate(next, state);
}