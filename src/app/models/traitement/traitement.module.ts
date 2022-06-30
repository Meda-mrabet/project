import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Praticien } from '../praticient/praticient.module';
import { User } from '../user/user.module';
import { Commande } from '../commande/commande.module';
import { Timestamp } from 'firebase/firestore';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Traitement {

  duration?:string;
  id_cmd ?:string;
  id_praticien?:string;
  id_trait?:string;
  payed?:boolean;
  price?:string;
  rdv?:{
    date:any;
    day:string;
    hour:string;
    time:string
  };
  etat?:any;
    begins_at :Timestamp;
    ends_at:Timestamp;
}
