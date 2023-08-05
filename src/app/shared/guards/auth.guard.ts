import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private router: Router,
              private userService: UserService,
              private jwtHelperService: JwtHelperService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(!this.jwtHelperService.isTokenExpired()){
      return true;
    }else{
      this.userService.logout(localStorage.getItem("token")).subscribe();
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }
    
  }
  
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).canActivate(next, state);
}