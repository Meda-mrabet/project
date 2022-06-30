import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user/user.module';
import { Timestamp } from 'firebase/firestore';
import { Specialite } from '../specialite/specialite.module';
import { Traitement } from '../traitement/traitement.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Commande{ 
  categorie?:string;
  etat?:any;
  createTime?:'';

  files?:[
  ];
  problem?:string;
  serviceType?:string;
  specialite?:string;
  description?:string;
  uid_client:string;
  id_traitement?:string;
  uid_cmd:string;
}
