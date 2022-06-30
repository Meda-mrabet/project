import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import { FeedBack } from 'src/app/models/feed-back/feed-back.module';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {
  public data:any[]=[];
  private dbPath = 'feedback';
  feedbackRefCollection: AngularFirestoreCollection<FeedBack>;
  feedbackRefDoc: AngularFirestoreDocument<any>;
  feedback: any;
  constructor(public db: AngularFirestore, public router: Router, ) { 
    try {
      this.feedbackRefCollection = db.collection(this.dbPath);
    } catch (e) {
      console.log(e);
    }
  }
   creat(feedback: FeedBack) {//: Promise<void>
    this.feedbackRefDoc = this.db.doc(this.dbPath+`/${feedback.id_feedBack}`);
    return this.feedbackRefDoc.set({...feedback},{merge:true});

  }
 
  async getfeedBackByID(id:string){
    return new Promise((resolve, reject) => {
      this.db.collection('feedback',ref=>ref.where('id_traitement','==',id)).get()
      .subscribe((ss:any) => {   
        this.data=[];

        ss.docs.forEach((doc:any) => {

          console.log(doc.data() )
          this.data.push(doc.data());


        });
        resolve(this.data);

      })
    })

  }
}
