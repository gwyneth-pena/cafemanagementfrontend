import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModalComponent } from 'src/app/shared/modals/alert-modal/alert-modal.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  users: any[] = [];
  usersInit: any[] = [];
  search: string = '';

  constructor(private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private userService: UserService){}

  
  ngOnInit(): void {
    this.getUsers();
  }

  trackbyFn(index:any, item:any): number{
    return item.id; 
  }

  getUsers(): void{
    this.spinner.show();
    this.userService.get().subscribe({
      next: response=>{
        this.spinner.hide();
        this.users = response.map((item:any)=>{return {...item, status: JSON.parse(item.status)}});
        this.usersInit = response;
      },
      error: error=>{this.spinner.hide();}
    });
  }

  searchUser(search:any):void{
    this.users = [];
    if(search.length>0){
      search.forEach((searchItem:any)=>{
        let user = this.usersInit.filter((item:any)=>item.name==searchItem.name);
        this.users = this.users.concat(user);
      });
    }else{
      this.users = this.usersInit;
    }
  } 

  update(data: any){
    this.spinner.show();
    let display: any = {
      title: "Add product"
    };
    data.status = data.status.toString();
    this.userService.update(data).subscribe({
      next:response=>{
        this.spinner.hide();
        display.body = response?.message;
        this.getUsers();
        this.openModal(AlertModalComponent, display);
      },
      error: err=>{
        this.spinner.hide();
        display.body = err.error?.message;
        this.openModal(AlertModalComponent, display);
      }
    })
  }

  openModal(modal:any, data:any):any{
    let modal_ref = this.modalService.open(modal, {centered: true});
    modal_ref.componentInstance.title = data.title;
    modal_ref.componentInstance.body= data.body;
    return modal_ref;
  }

}
