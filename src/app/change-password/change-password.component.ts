import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../shared/modals/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../shared/modals/confirm-modal/confirm-modal.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  isSubmitted: boolean = false;
  showOldPass: boolean = false;
  showNewPass: boolean = false;
  showConfPass: boolean = false;


  form: FormGroup = this.formBuilder.group({
    old_password: ['', [Validators.required]],
    new_password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    email: ['', Validators.required]
  }, {validators: this.passwordMatchValidator.bind(this)});

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private jwtHelperService: JwtHelperService,
              private spinner: NgxSpinnerService
  ){
  }

  ngOnInit(): void {
    this.form.controls['email'].setValue(this.jwtHelperService.decodeToken()?.sub);
  }

  reset(): void{
    this.isSubmitted = false;
    this.form.reset();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    let result = null;
    if(control.get('new_password')?.value!=control.get('confirm_password')?.value){
      result = {isPasswordNotMatched: true};
    }
    return result;
  }

  openModal(modal:any, data:any):any{
    let modal_ref = this.modalService.open(modal, {centered: true});
    modal_ref.componentInstance.title = data.title;
    modal_ref.componentInstance.body= data.body;
    return modal_ref;
  }

  submit(): void{
    this.isSubmitted = true;
    if(this.form.valid){
      let display: any = {
        title: "Change Password",
        body: "Are you sure that you want to change your password?"
      };
      this.openModal(ConfirmModalComponent, display).result.then((modalResponse:any)=>{
        if(modalResponse=='Ok'){
          this.spinner.show();
          this.userService.changePassword(this.form.value).subscribe({
            next: response=>{
              this.spinner.hide();
              display.body = response.message;
              this.openModal(AlertModalComponent, display);
              this.reset();        
            },error: err=>{
              this.spinner.hide();
              display.body = err.error?.message;
              this.openModal(AlertModalComponent, display);
            }
          });
        }
      })
    }
  }
}
