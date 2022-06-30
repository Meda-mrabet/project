import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FeedBack{ 
id_feedBack ?:string;
id_traitement?:string;
id_praticien?:string;
rating?:number;
avis_patient?:string;
avis_praticien?:string;
creat_at?:Date;



}
