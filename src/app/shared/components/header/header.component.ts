import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isMenuCollapsed: boolean = true;
  showSideBar: boolean = false;
  route: string = '';
  sidebar: any;

  ngOnInit(): void {
    this.sidebar = this.document.getElementsByClassName("sidebar")[0];
    if(this.sidebar)(this.sidebar as HTMLElement).style.position = "absolute";
  }

  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document      
  ){
    this.router.events.subscribe(() => {
      this.route = router.url;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(event.target.innerWidth<=998){
      (this.sidebar as HTMLElement).style.position = "absolute";
    }
  }

  toggleSideBar(): void{
    this.showSideBar = !this.showSideBar;
    if(this.showSideBar){
      this.sidebar.classList.remove('slide-out');          
      this.sidebar.classList.add('slide-in');
      (this.sidebar as HTMLElement).style.position = "absolute";
    }else{
      this.sidebar.classList.remove('slide-in');          
      this.sidebar.classList.add('slide-out');
    }

  }


} 
