import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  isSubmitted: boolean = false;
  showPass: boolean = false;
  showConfPass: boolean = false;
  form: FormGroup = this.getForm();

  constructor(private formBuilder:FormBuilder,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private userService: UserService
            ){
  }

  getForm(): FormGroup{
    return this.formBuilder.group({
      name: ["", Validators.required],
      contactNumber: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      role: ["user", Validators.required]
    }, {validators: this.matchPassword});
  }

  matchPassword(control: AbstractControl): ValidationErrors | null {
 
    const password = control.get("password")?.value;
    const confirm = control.get("confirmPassword")?.value;
 
 
    if (password != confirm) { return { 'passwordsNotMatched': true } }
 
    return null;
 
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
      this.spinner.show();
      let display: any = {
        title: "Sign Up"
      };
      this.userService.signup(this.form.value).subscribe({
        next: response=>{
          this.spinner.hide();
          display.body = response.message;
          this.openModal(AlertModalComponent, display);
          this.reset();
        },
        error: err =>{
          this.spinner.hide();
          display.body = err.error?.message;
          this.openModal(AlertModalComponent, display);
        }
      });
    }
  }

  reset(): void{
    this.form.reset(this.getForm().value);
    this.showConfPass = false;
    this.showPass = false;
    this.isSubmitted = false;
  }
}
