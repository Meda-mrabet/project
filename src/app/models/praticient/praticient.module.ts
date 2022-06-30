import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from '../user/user.module'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Praticien { 
  bio?:string;
  minPrice ?:number;
  education?:string;
  languages?:string[];
  serviceType?:number[];
  workPlace?:string;
  uid:User["uid"];
  specialite?:string;
}
