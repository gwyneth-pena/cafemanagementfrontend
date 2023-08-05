import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent {

  isMiniSidebar: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document){}

  iconsOnlyHandler(event: any): void{

    if(event.toLowerCase()=='mini'){
      this.isMiniSidebar = true;
    }else{
      this.isMiniSidebar = false;
    }
    
  };

}
