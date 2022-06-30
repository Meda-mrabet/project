import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public document: any;
  public data: any[] = [];
  private dbPath = '/document';
  documentRefDoc: AngularFirestoreDocument<any>;
  documentRefCollection: AngularFirestoreCollection<Document>;



  constructor(public db: AngularFirestore) {
    try {
      this.documentRefCollection = db.collection(this.dbPath);
    } catch (e) {
      console.log(e);
    }


  }
  create(id:any,document:Document) :any{
    return this.db.collection('document').
    doc(id)
    .set({...document},{merge:true})
     
  }

  getAll(id:any) {


    this.data = [];
    return new Promise((resolve, reject) => {
      this.db
        .collection("document",ref=>ref.where('uid','==',id))
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
    this.documentRefDoc = this.db.doc(this.dbPath + `/${id}`);
    return this.documentRefDoc.update(data);
  }
  async getappointmentByID(id: string) {
    this.documentRefDoc = this.db.doc(this.dbPath + `/${id}`);
    return new Promise((resolve, reject) => {
      this.db.doc(this.dbPath + `/${id}`)
        .get().subscribe((one) => {
          resolve(one.data())

        }
        )
    })
  }

  async clicReserver(id: string,data:any){
    this.documentRefDoc = this.db.doc(this.dbPath+`/${id}`);
     return this.documentRefDoc.update(data).then(() => {
    console.log('done');
    
  }).catch(function(error) {

    console.error('Error writing document: ', error);

   });

  }

    async updateRndv(id:any,path:any,month:any,day:any,hour:any){
   await   this.db.collection('appointment').doc(id).set({[path]:{[month]:{[day]:{[hour]:firebase.firestore.FieldValue.delete()}}}},{merge:true})
    }
}
