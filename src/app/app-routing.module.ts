import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardGuard } from './shared/guards/dashboard.guard';

const routes: Routes = [
  {
    path: "cafe",
    pathMatch:"full",
    redirectTo: "/cafe/dashboard"
  },
  {
    path: "",
    title: "Cafe Management System",
    component: HomeComponent,
    canActivate: [DashboardGuard]
  },
  {
    path: "sign_up",
    title: "Sign Up | Cafe Management System",
    component: SignupComponent,
    canActivate: [DashboardGuard]
  },
  {
    path: "forgot_password",
    title: "Forgot Password | Cafe Management System",
    component: ForgotPasswordComponent,
    canActivate: [DashboardGuard]
  },
  {
    path: "login",
    title: "Login | Cafe Management System",
    component: LoginComponent,
    canActivate: [DashboardGuard]
  },
  {
    path:"cafe",
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
