import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { UserService } from '../shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IPasswordStrengthMeterService, PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      imports: [HttpClientTestingModule, PasswordStrengthMeterModule, FormsModule, ReactiveFormsModule],
      providers: [UserService, NgbModal, NgxSpinnerService, JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, IPasswordStrengthMeterService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
