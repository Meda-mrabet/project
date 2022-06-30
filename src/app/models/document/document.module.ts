import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Document { 

  created_by?:string;
  created_date?:any;
  description?:string;
  file?:string;
  type?:string;
  uid?:string;
}
