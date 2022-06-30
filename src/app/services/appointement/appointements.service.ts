import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import firebase from 'firebase/compat/app';
import { merge } from 'rxjs';
import { Appointment } from 'src/app/models/appointement/appointement.module';
import { Traitement } from 'src/app/models/traitement/traitement.module';
@Injectable({
  providedIn: 'root'
})
export class AppointementsService {
  public appointment: any;
  public data: any[] = [];
  private dbPath = '/appointment';
  appointmentRefDoc: AngularFirestoreDocument<any>;
  appointmentRefCollection: AngularFirestoreCollection<Appointment>;



  constructor(public db: AngularFirestore) {
    try {
      this.appointmentRefCollection = db.collection(this.dbPath);
    } catch (e) {
      console.log(e);
    }


  }
  createAppointement(id:any,appointement:Appointment) :any{
    return this.db.collection('appointment').
    doc(id)
    .set({...appointement},{merge:true})
     
  }

  getAllAppointement() {


    this.data = [];
    return new Promise((resolve, reject) => {
      this.db
        .collection("appointment")
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
    this.appointmentRefDoc = this.db.doc(this.dbPath + `/${id}`);
    return this.appointmentRefDoc.update(data);
  }
  async getappointmentByID(id: string) {
    this.appointmentRefDoc = this.db.doc(this.dbPath + `/${id}`);
    return new Promise((resolve, reject) => {
      this.db.doc(this.dbPath + `/${id}`)
        .get().subscribe((one) => {
          resolve(one.data())

        }
        )
    })
  }

  async clicReserver(id: string,data:any){
    this.appointmentRefDoc = this.db.doc(this.dbPath+`/${id}`);
     return this.appointmentRefDoc.update(data).then(() => {
    console.log('done');
    
  }).catch(function(error) {

    console.error('Error writing document: ', error);

   });

  }

    async updateRndv(id:any,path:any,month:any,day:any,hour:any){
   await   this.db.collection('appointment').doc(id).set({[path]:{[month]:{[day]:{[hour]:firebase.firestore.FieldValue.delete()}}}},{merge:true})
    }

}