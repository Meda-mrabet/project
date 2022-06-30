import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Roles } from './role.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class User {
  uid: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  birthday?: any;
  photoURL?:string;
  emailVerified?: boolean;
  phoneNumber?:string;
  roles? : Roles ;
  address? : {
    city?:string;
    latitude?:number;
    longitude?:number;
  };
  fcmTokens?: { [token: string]: true };
  position :{
    longitude?:number;
    latitude?:number
  }
}
