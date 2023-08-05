import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangePasswordGuard } from '../shared/guards/change-password.guard';
import { CategoryListComponent } from './category-list/category-list.component';
import { PermissionGuard } from '../shared/guards/permission-guard.guard';
import { ProductListComponent } from './product-list/product-list.component';
import { OrdersComponent } from './orders/orders.component';
import { BillComponent } from './bill/bill.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'cafe', pathMatch:'full', redirectTo:'/dashboard'},
  {
    path:'dashboard', 
    component: DashboardComponent, 
    title: 'Dashboard | Cafe Management System',
    canActivate: [PermissionGuard]
  },
  {
    path: "change_password",
    title: "Change Password | Cafe Management System",
    component: ChangePasswordComponent,
    canActivate: [ChangePasswordGuard]
  },
  {
    path: "category/list",
    title: "Categories > List | Cafe Management System",
    component: CategoryListComponent,
    canActivate: [PermissionGuard]
  },
  {
    path: "product/list",
    title: "Products > List | Cafe Management System",
    component: ProductListComponent,
    canActivate: [PermissionGuard]
  },
  {
    path: "product/order",
    title: "Products > Order | Cafe Management System",
    component: OrdersComponent,
    canActivate: [PermissionGuard]
  },
  {
    path: "bill/list",
    title: "View Bills | Cafe Management System",
    component: BillComponent,
    canActivate: [PermissionGuard]
  },
  {
    path: "user/list",
    title: "Manage Users | Cafe Management System",
    component: UserComponent,
    canActivate: [PermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
