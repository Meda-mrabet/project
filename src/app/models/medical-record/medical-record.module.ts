import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MedicalRecord {
  commandes?:any[];
  created_date?:any;
  documments?:any[];
  uid?:string;
 }
