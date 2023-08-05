import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuService } from '../menu/menu-items';

@Injectable({
  providedIn: 'root'
})
class PermissionGuardService{

  constructor(private menuService: MenuService,
              private router: Router,
              private jwtHelperService: JwtHelperService){
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let menus = this.menuService.getMenuItems();
      let userRole = this.jwtHelperService.decodeToken()?.role;
      menus = this.menuService.getMenuItems().filter((item:any)=>{
        let roles = item.role.split(',');
        roles.forEach((role:any) => {
          role = role.toLowerCase();
        });
        if(roles.includes(userRole.toLowerCase())){
          return item;
        }
      });
 
      if(menus?.map((item:any)=>item.state).filter(item=>state.url.includes(item)).length>0){
        return true;
      }else{
        this.router.navigate([`/cafe/${menus[0].state}`]);
        return false;
      }
    }
}

export const PermissionGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionGuardService).canActivate(next, state);
}
