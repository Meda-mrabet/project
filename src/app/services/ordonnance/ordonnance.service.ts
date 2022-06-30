import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import { Ordonnance} from 'src/app/models/ordonnance/ordonnance.module';

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
  ta: any[]=[];
  private dbPath = 'ordonnances';
  ordonnanceRefCollection: AngularFirestoreCollection<Ordonnance>;
  ordonnanceRefDoc: AngularFirestoreDocument<any>;
  ordonnance: any;
  constructor(public db: AngularFirestore, public router: Router, ) { 
    try {
      this.ordonnanceRefCollection = db.collection(this.dbPath);
    } catch (e) {
      console.log(e);
    }
  }
   creat(ordonnance: Ordonnance) {//: Promise<void>
    this.ordonnanceRefDoc = this.db.doc(this.dbPath+`/${ordonnance.uid}`);
    return this.ordonnanceRefDoc.set({...ordonnance},{merge:true});

  }
 
  async getOrdonnanceByID(id:string){
    this.ordonnanceRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return new Promise((resolve, reject) => {
      this.db.doc(this.dbPath+`/${id}`)
       .get().subscribe((one:any)=> {
           console.log(one.data())

          resolve(one.data())
        }
      )
    })
  }


}
