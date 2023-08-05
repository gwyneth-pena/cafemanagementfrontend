import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../shared/modals/alert-modal/alert-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isSubmitted: boolean = false;
  showPass: boolean = false;

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private router: Router,
              private spinner: NgxSpinnerService
  ){}

  openModal(modal:any, data:any):any{
    let modal_ref = this.modalService.open(modal, {centered: true});
    modal_ref.componentInstance.title = data.title;
    modal_ref.componentInstance.body= data.body;
    return modal_ref;
  }

  submit():void{
    this.isSubmitted = true;
    if(this.form.valid){
      this.spinner.show();
      let display: any = {
        title: "Login"
      };
      this.userService.login(this.form.value).subscribe({
        next: response=>{
          this.spinner.hide();
          display.body = response.message;
          localStorage.setItem("token", response.token);
          this.router.navigate(["/cafe/dashboard"]);
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

  reset():void{
    this.isSubmitted = false;
    this.form.reset();
  }
}
