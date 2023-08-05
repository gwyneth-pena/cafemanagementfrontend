import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { CategoryListComponent } from './category-list/category-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductListComponent } from './product-list/product-list.component';
import { OrdersComponent } from './orders/orders.component';
import { BillComponent } from './bill/bill.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ChangePasswordComponent,
    CategoryListComponent,
    ProductListComponent,
    OrdersComponent,
    BillComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    PasswordStrengthMeterModule
  ]
})
export class DashboardModule { }
