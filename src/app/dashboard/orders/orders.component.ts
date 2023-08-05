import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BillService } from 'src/app/shared/services/bill.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-order',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  form: FormGroup = this.getForm();

  paymentMethods: any = [
    'Cash',
    'Credit Card',
    'Debit Card'
  ];

  categoryList: any[] = [];
  productList: any[] = [];
  selectedProducts: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private billService: BillService,
              private spinner: NgxSpinnerService,
              private categoryService: CategoryService){
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getForm(): FormGroup{
    return this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.email],
      contactNumber: [null, Validators.required],
      paymentMethod: [null, Validators.required],
      product: [null],
      category: [null],
      quantity: [0],
      price: [null],
      total: [0]
    });
  }

  getCategories(): void{
    this.form.controls['quantity'].setValue(0);
    this.form.controls['total'].setValue(0);
    this.form.updateValueAndValidity();
    this.categoryService.get().subscribe({
      next: response=>{
        this.categoryList = response;
      },
      error: err=>{}
    });
  }

  getProducts(categoryId: number): void{

    if(categoryId){
      this.productService.getByCategory(categoryId).subscribe({
        next: response=>{
          this.productList = response;
          this.productList = this.productList.filter((item:any)=>item.status=="available");
        },
        error: err=>{}
      });
    }
  }

  computeTotal(): void{
    let total: number = 0;
    total = this.form.value.price*this.form.value.quantity;
    this.form.controls["total"].setValue(total);
  }

  addToSelectedProducts(formVal: any): void{
    const {price, total, quantity, product, category} = formVal; 
    if(product && quantity>0){
      this.selectedProducts.push({price, total, quantity, product, category});
      this.form.controls['category'].setValue(null);
      this.form.controls['product'].setValue(null);
      this.form.controls['price'].setValue(null);
      this.form.controls['quantity'].setValue(0);
      this.form.controls['total'].setValue(0);
    }
  }

  trackbyFn(index:any, item:any): number{
    return item.id; 
  }

  removeSelectedProduct(product:any): void{
    this.selectedProducts.splice(this.selectedProducts.indexOf(product),1);
  } 

  submit(data:any){

    this.selectedProducts = this.selectedProducts.map(item=>{
      item.name = item.product.name;
      item.category = item.category.name;
      return item;
    });

    let date = new Date();

    let grandTotal= this.selectedProducts.reduce((acc:any,curr:any)=>{
      acc = acc+curr.total;
      return acc;
    }, 0);

    let input = {
      name: data.name,
      uuid: `Bill-${date.getMonth()+1}-${date.getDay()}-${date.getFullYear()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
      email: data.email||"N/A",
      contactNumber: data.contactNumber,
      paymentMethod: data.paymentMethod,
      total: grandTotal,
      productDetail: JSON.stringify(this.selectedProducts)
    };


    this.spinner.show();
    this.billService.generateReport(input).subscribe({
      next: response=>{
        this.billService.getPdf(input).subscribe({
          next: response=>{
            this.form.reset();
            saveAs(response, `${input.uuid}.pdf`);
            this.spinner.hide();
          },
          error: err=>{this.spinner.hide()}
        })
        this.selectedProducts = [];
      },
      error: err=>{this.spinner.hide();}
    });

  }


}
