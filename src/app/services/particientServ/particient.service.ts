import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { collection, doc, setDoc , query, where} from "firebase/firestore";
import { Praticien } from 'src/app/models/praticient/praticient.module';

@Injectable({
  providedIn: 'root'
})
export class PraticientService {
  public Praticient:any;
  public data:any[]=[];
  private dbPath = 'praticien';
  pratRefDoc: AngularFirestoreDocument<any>;
  pratRefCollection: AngularFirestoreCollection<Praticien>;
  constructor(public db: AngularFirestore) { 
    try{
      this.pratRefCollection = db.collection(this.dbPath);
    }catch (e){
      console.log(e);
    }

  }
  getAllPraticien() {
    this.data=[];
    return new Promise((resolve, reject) => {
      this.db
        .collection("praticien")
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            // console.log(doc.data())
            this.data.push(doc.data());
          });
          
          resolve(this.data);
          // console.log(this.data)
        })
    })

  }
  update(id: string, data: any): Promise<void> {
    this.pratRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return this.pratRefDoc.update(data);
  }

}
