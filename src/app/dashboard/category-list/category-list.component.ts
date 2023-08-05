import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModalComponent } from 'src/app/shared/modals/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{

  categoryList: any[] = [];
  isSubmitted: boolean = false;
  modalRef: any;
  modalTitle: string = '';
  modalCatData: any = {};
  modalAction: string = '';
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });
  search:any = [];
  categoryOptions = [];

  constructor(private categoryService: CategoryService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService
    ){

  }

  ngOnInit(): void {
    this.getCategoryList().then((response:any)=>{
      this.categoryOptions = response;
    });
  }

  open(modal:any, type: string, data?: any): void{
    this.modalRef = this.modalService.open(modal, {backdrop: 'static', centered: true});
    if(type.toLowerCase()=='add'){
      this.modalTitle = "Add category";
      this.modalCatData = {};
      this.form.get('name')?.setValue('');
    }
    if(type.toLowerCase()=='update'){
      this.modalTitle = "Update category";
      this.modalCatData = data;
      this.form.get('name')?.setValue(data.name);
    }
    this.modalAction = type;
  }

  getCategoryList(): any{
    this.spinner.show();
    return new Promise((resolve:any)=>{
      this.categoryService.get().subscribe({
        next: response=>{
          this.spinner.hide();
          this.categoryList = response;
          resolve(this.categoryList);
        },
        error: err=>{
          this.spinner.hide();
        }
      });
    });
  }

  searchCategory(search:any): void{
    this.categoryList = [];

    this.spinner.show();
    if(search.length>0){
      search.forEach((item:any)=>{
        this.categoryService.get(item.id).subscribe({
          next: response=>{
            this.spinner.hide();
            this.categoryList.push(response[0]);
          }
        })
      });
    }else{
      this.getCategoryList();
    }
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
        title: "Add Category"
      };

      if(action.toLowerCase()=='add'){

        this.spinner.show();
        this.categoryService.add(this.form.value).subscribe({
          next: response=>{
            this.spinner.hide();
            this.isSubmitted = false;
            display.body = response.message;
            this.openModal(AlertModalComponent, display);
            this.getCategoryList();
            this.form.reset();      
          },error: err=>{
            this.spinner.hide();
            display.body = err.error?.message;
            this.openModal(AlertModalComponent, display);
          }
        });


      }else{


        display = {
          title: "Update Category"
        };
        
        this.spinner.show();

        let formData = {
          ...this.form.value,
          id: this.modalCatData.id
        };

        this.categoryService.update(formData).subscribe({
          next: response=>{
            this.spinner.hide();
            this.isSubmitted = false;
            display.body = response.message;
            this.openModal(AlertModalComponent, display);
            this.getCategoryList();
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

  deleteCategory(category: any): void{
    let display: any = {
      title: "Delete Category",
      body: `Are you sure you want to delete category <strong>${category.name}</strong>?`
    };
    this.openModal(ConfirmModalComponent, display).result.then((response: any)=>{
      if(response?.toUpperCase()=='OK'){
        this.categoryService.delete(category.id).subscribe({
          next: response=>{
            this.spinner.hide();
            this.isSubmitted = false;
            display.body = response.message;
            this.openModal(AlertModalComponent, display);
            this.getCategoryList().then((response:any)=>{
              this.categoryOptions = response;
            });
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
