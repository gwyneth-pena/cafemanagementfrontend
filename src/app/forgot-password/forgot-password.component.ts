import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModalComponent } from '../shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  
  isSubmitted: boolean = false;

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService
  ){
  }

  reset(): void{
    this.isSubmitted = false;
    this.form.reset();
  }

  openModal(modal:any, data:any):any{
    let modal_ref = this.modalService.open(modal);
    modal_ref.componentInstance.title = data.title;
    modal_ref.componentInstance.body= data.body;
    return modal_ref;
  }

  submit(): void{
    this.isSubmitted = true;
    if(this.form.valid){
      let display: any = {
        title: "Forgot Password"
      };
      this.spinner.show();
      this.userService.forgotPassword(this.form.value).subscribe({
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
  }

}
