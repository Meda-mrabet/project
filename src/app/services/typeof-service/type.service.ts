import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Type} from "src/app/models/typeModel/type"
@Injectable({
  providedIn: 'root'
})
export class TypeService {
  public data:any[]=[];

  TypesRefDoc: AngularFirestoreDocument<Type>;
  private dbPath = '/type_of_service';
  TypesRef: AngularFirestoreCollection<Type>;

  constructor(private db: AngularFirestore) { 

    this.TypesRef = db.collection(this.dbPath);


  }
  async getAllTypes() {
    this.data=[];
    return new Promise((resolve, reject) => {
      this.db
        .collection("type_of_service")
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            this.data.push(doc.data());
          });
          resolve(this.data);
          //console.log(this.data);
        })
    })
  };

  async getTypeByID(id:string){
    this.TypesRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return new Promise((resolve, reject) => {
      this.db.doc(this.dbPath+`/${id}`)
        .get().subscribe((one)=> {
          resolve(one.data())
        }
      )
    })
  }
  update(id: string, data: any): Promise<void> {
    return this.TypesRef.doc(id).update(data);
  }

  getAll(): AngularFirestoreCollection<Type> {
    return this.TypesRef;
  }
}

