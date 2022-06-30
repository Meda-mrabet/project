import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Ordonnance{
uid?:string;
firstName?:string;
lastName?:string;
description?:string;
date?:string;
city?:string;
nameOfCreated?:string;

}
