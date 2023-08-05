import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData:any = {};
  
  constructor(private dashboardService: DashboardService,
              private spinner: NgxSpinnerService){

  }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void{

    this.spinner.show();
    this.dashboardService.getDashboardDetails().subscribe({
      next: response=>{
        this.spinner.hide();
        this.dashboardData = response;
      },
      error:()=>{this.spinner.hide();}
    });

  }
}
