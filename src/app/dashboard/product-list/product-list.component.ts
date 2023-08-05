import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModalComponent } from 'src/app/shared/modals/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productList: any[] = [];
  isSubmitted: boolean = false;
  modalRef: any;
  modalTitle: string = '';
  modalCatData: any = {};
  modalAction: string = '';
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    status: [null, Validators.required],
    price: ['', Validators.required],
    category_id: [null, Validators.required],
    description: ['']
  });
  search:any = [];
  productOptions = [];
  categoryList = [];
  statusList = [
    {label: "Available", value: "available"},
    {label: "Out of Stock", value: "outofstock"}
  ];

  constructor(private productService: ProductService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private spinner: NgxSpinnerService
    ){

  }

  ngOnInit(): void {
    this.getProductList().then((response:any)=>{
      this.productOptions = response;
    });
    this.getCategoryList();
  }

  open(modal:any, type: string, data?: any): void{
    this.modalRef = this.modalService.open(modal, {backdrop: 'static', centered: true});
    if(type.toLowerCase()=='add'){
      this.modalTitle = "Add product";
      this.modalCatData = {};
      this.form.reset();
    }
    if(type.toLowerCase()=='update'){
      this.modalTitle = "Update product";
      this.modalCatData = data;
      let formVal = {...data};
      formVal.category_id = formVal.category.id;
      delete formVal.id;
      delete formVal.category;
      this.form.setValue(formVal);
    }
    this.modalAction = type;
  }

  getProductList(): any{
    this.spinner.show();
    return new Promise((resolve:any)=>{
      this.productService.get().subscribe({
        next: response=>{
          this.spinner.hide();
          this.productList = response;
          resolve(this.productList);
        },
        error: err=>{
          this.spinner.hide();
        }
      });
    });
  }

  getCategoryList(): any{
    this.categoryService.get().subscribe({
      next: response=>{
        this.spinner.hide();
        this.categoryList = response;
      }
    });
  }

  searchProduct(search:any): void{
    this.productList = [];

    this.spinner.show();
    if(search.length>0){
      search.forEach((item:any)=>{
        this.productService.get(item.id).subscribe({
          next: response=>{
            this.spinner.hide();
            this.productList.push(response[0]);
          }
        })
      });
    }else{
      this.getProductList();
    }
  }

  getStatus(status:string): string{
    return this.statusList.filter(item=>status==item.value)[0].label;
  }

  openModal(modal:any, data:any):any{
    let modal_ref = this.modalService.open(modal, {centered: true});
    modal_ref.componentInstance.title = data.title;
    modal_ref.componentInstance.body= data.body;
    return modal_ref;
  }

  submit(action: string): void{
    this.isSubmitted = true;

    if(this.form.valid){

      this.modalService.dismissAll();

      let display: any = {
        title: "Add product"
      };

      if(action.toLowerCase()=='add'){

        this.spinner.show();
        this.productService.add(this.form.value).subscribe({
          next: response=>{
            this.spinner.hide();
            this.isSubmitted = false;
            display.body = response.message;
            this.openModal(AlertModalComponent, display);
            this.getProductList().then((response:any)=>{
              this.productOptions = response;
            });
            this.form.reset();      
          },error: err=>{
            this.spinner.hide();
            display.body = err.error?.message;
            this.openModal(AlertModalComponent, display);
          }
        });


      }else{


        display = {
          title: "Update product"
        };
        
        this.spinner.show();

        let formData = {
          ...this.form.value,
          id: this.modalCatData.id
        };

        this.productService.update(formData).subscribe({
          next: response=>{
            this.spinner.hide();
            this.isSubmitted = false;
            display.body = response.message;
            this.openModal(AlertModalComponent, display);
            this.getProductList();
            this.form.reset();      
          },error: err=>{
            this.spinner.hide();
            display.body = err.error?.message;
            this.openModal(AlertModalComponent, display);
          }
        });
      }
    }
  }

  trackbyFn(index:any, item:any): number{
    return item.id; 
  }

  deleteProduct(product: any): void{
    let display: any = {
      title: "Delete product",
      body: `Are you sure you want to delete product <strong>${product.name}</strong>?`
    };
    this.openModal(ConfirmModalComponent, display).result.then((response: any)=>{
      if(response?.toUpperCase()=='OK'){
        this.productService.delete(product.id).subscribe({
          next: response=>{
            this.spinner.hide();
            this.isSubmitted = false;
            display.body = response.message;
            this.openModal(AlertModalComponent, display);
            this.getProductList();
            this.form.reset();      
          },error: err=>{
            this.spinner.hide();
            display.body = err.error?.message;
            this.openModal(AlertModalComponent, display);
          }
        });    
      }
    });
  }
}
