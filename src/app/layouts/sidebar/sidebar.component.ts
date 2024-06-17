import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Menu, MenuService } from 'src/app/shared/menu/menu-items';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  userRole: string = '';
  menus: Menu[] = [];
  showIconOnly: boolean = false;
  @Output() 
  iconsOnly: EventEmitter<any> = new EventEmitter();

  constructor(private jwtHelperService: JwtHelperService,
              private spinner: NgxSpinnerService,
              private userService: UserService, 
              private router: Router,
              private menuService: MenuService){}

  ngOnInit(): void {
    this.userRole = this.jwtHelperService.decodeToken()?.role;
    this.menus = this.menuService.getMenuItems().filter((item:any)=>{
      let roles = item.role.split(',');
      roles.forEach((role:any) => {
        role = role?.toLowerCase();
      });
      if(roles.includes(this.userRole?.toLowerCase())){
        return item;
      }
    });
  }

  logout(): void{
    this.spinner.show()
    this.userService.logout(localStorage.getItem("token")).subscribe({
      next: response=>{
        this.spinner.hide();
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      error: err=>{this.spinner.hide();}
    });
  }
}
