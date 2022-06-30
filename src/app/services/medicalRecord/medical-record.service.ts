
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
  import { MedicalRecord } from 'src/app/models/medical-record/medical-record.module';
@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  public record: any;
  public data: any[] = [];
  private dbPath = '/medicalRecord';
  medicalRecordRefDoc: AngularFirestoreDocument<any>;
  medicalRecordRefCollection: AngularFirestoreCollection<MedicalRecord>;



  constructor(public db: AngularFirestore) {
    try {
      this.medicalRecordRefCollection = db.collection(this.dbPath);
    } catch (e) {
      console.log(e);
    }


  }
  create(id:any,record:Document) :any{
    return this.db.collection('medicalRecord').
    doc(id)
    .set({...record},{merge:true})
     
  }

  getAll(id:any) {

    this.data = [];
    return new Promise((resolve, reject) => {
      this.db
        .collection("medicalRecord", ref=>ref.where( 'uid','==',id ) )
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
    this.medicalRecordRefDoc = this.db.doc(this.dbPath + `/${id}`);
    return this.medicalRecordRefDoc.update(data);
  }
  async getappointmentByID(id: string) {
    this.medicalRecordRefDoc = this.db.doc(this.dbPath + `/${id}`);
    return new Promise((resolve, reject) => {
      this.db.doc(this.dbPath + `/${id}`)
        .get().subscribe((one) => {
          resolve(one.data())

        }
        )
    })
  }

  async clicReserver(id: string,data:any){
    this.medicalRecordRefDoc = this.db.doc(this.dbPath+`/${id}`);
     return this.medicalRecordRefDoc.update(data).then(() => {
    console.log('done');
    
  }).catch(function(error) {

    console.error('Error writing document: ', error);

   });

  }

    async updateRndv(id:any,path:any,month:any,day:any,hour:any)
    {

    await   this.db.collection('medicalRecord').doc(id).set({[path]:{[month]:{[day]:{[hour]:firebase.firestore.FieldValue.delete()}}}},{merge:true})

    }

}
