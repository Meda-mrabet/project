import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { Specialite } from 'src/app/models/specialite/specialite.module';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  public specialite:any;
  public data:any[]=[];
  private dbPath = '/specialities';
  specialiteRefDoc: AngularFirestoreDocument<any>;
  specialiteRefCollection: AngularFirestoreCollection<Specialite>;



  constructor(public db: AngularFirestore) {
    try{
      this.specialiteRefCollection = db.collection(this.dbPath);
    }catch (e){
      console.log(e);
    }

    
   }

   getAllSpecial() {
    this.data=[];
    return new Promise((resolve, reject) => {
      this.db
        .collection("specialities")
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            this.data.push(doc.data());

          });
          resolve(this.data);
        })
    })

  
  }
  update(id: string, data: any): Promise<void> {
    this.specialiteRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return this.specialiteRefDoc.update(data);
  }
  async getSpecialiteByID(id:string){
    this.specialiteRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return new Promise(async (resolve, reject) => {
      await this.db.doc(this.dbPath+`/${id}`)
        .get().subscribe((one)=> {
          resolve(one.data())
          
        }
      )
    })
  }

  getAllspecialiteBy(idd:any) {
    this.data=[];
    return new Promise((resolve, reject) => {
      this.db
        .collection("specialities",ref=>ref.where('id','==',idd))
        .get()
        .subscribe((ss:any) => {
          ss.docs.forEach((doc:any) => {
            this.data=(doc.data());
  //          console.log(this.data)
          });
          resolve(this.data);
          
        })
    })

  }
}
