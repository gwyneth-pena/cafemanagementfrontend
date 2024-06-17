import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { NgbCarouselModule, NgbModalModule, NgbModule, NgbNav, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './shared/modals/alert-modal/alert-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ConfirmModalComponent } from './shared/modals/confirm-modal/confirm-modal.component';
import { FooterComponent } from './shared/components/footer/footer.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    AlertModalComponent,
    ForgotPasswordComponent,
    LoginComponent,
    FullComponent,
    SidebarComponent,
    ConfirmModalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
    NgbCarouselModule,
    PasswordStrengthMeterModule.forRoot(),
    NgbNav,
    NgbTooltip,
    ReactiveFormsModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
     }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
