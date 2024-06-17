import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModalComponent } from 'src/app/shared/modals/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { BillService } from 'src/app/shared/services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit{

  bills: any[] = [];
  search:any[] = [];
  billOptions: any[] = [];
  billsInit: any = [];
  modalRef: any;
  modalTitle: string = "";
  modalData: any;

  constructor(private billService: BillService,
              private modalService: NgbModal,
              private jwtHelperService: JwtHelperService,
              private spinner: NgxSpinnerService){
  }

  ngOnInit(): void {
    this.getBills();
  } 

  searchBill(search:any):void{
    this.bills = [];
    if(search.length>0){
      search.forEach((searchItem:any)=>{
        let bill = this.billsInit.filter((item:any)=>item.name==searchItem);
        this.bills = this.bills.concat(bill);
      });
    }else{
      this.bills = this.billsInit;
    }
  } 

  open(modal:any, data?: any): void{
    this.modalRef = this.modalService.open(modal, {backdrop: 'static', size: 'lg', centered: true});
    this.modalTitle = data.uuid;
    this.modalData = data;
    this.modalData.productDetail = JSON.parse(this.modalData.productDetail);
  }

  openModal(modal:any, data:any):any{
    let modal_ref = this.modalService.open(modal, {centered: true});
    modal_ref.componentInstance.title = data.title;
    modal_ref.componentInstance.body= data.body;
    return modal_ref;
  }

  deleteBill(bill: any): void{
    let display: any = {
      title: "Delete Bill",
      body: `Are you sure you want to delete bill <strong>${bill.uuid}.pdf</strong>?`
    };
    this.openModal(ConfirmModalComponent, display).result.then((response: any)=>{
      if(response?.toUpperCase()=='OK'){
        this.billService.delete(bill.id).subscribe({
          next: response=>{
            this.spinner.hide();
            display.body = response.message;
            this.openModal(AlertModalComponent, display);
            this.getBills();
          },error: err=>{
            this.spinner.hide();
            display.body = err.error?.message;
            this.openModal(AlertModalComponent, display);
          }
        });    
      }
    });
  }

  getBills():void{
    let userRole = this.jwtHelperService.decodeToken()?.role;
    let email: string|undefined;

    if(userRole?.toLowerCase().includes('user')){
      email = this.jwtHelperService.decodeToken()?.sub;
    }

    this.spinner.show();
    this.billService.get(email).subscribe({
      next: response=>{
        this.spinner.hide();
        this.billOptions = response.map((item:any)=>item.name);
        this.billOptions = this.billOptions.filter((val:any, index:number) => {
          return this.billOptions.indexOf(val) === index;
        });
        this.bills = response;
        this.billsInit = response;
      },
      error: err=>{this.spinner.hide();}
    });
  }

  trackbyFn(index:any, item:any): number{
    return item.id; 
  }

  downloadFile(bill:any): void{
    this.spinner.show();
    this.billService.getPdf(bill).subscribe({
      next: response=>{
        saveAs(response, `${bill.uuid}.pdf`);
        this.spinner.hide();
      },
      error: err=>{this.spinner.hide();}
    });
  }
}
