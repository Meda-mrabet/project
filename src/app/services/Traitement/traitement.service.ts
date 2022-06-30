import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import { Traitement } from 'src/app/models/traitement/traitement.module';
import { arrayUnion, FieldValue } from '@angular/fire/firestore'
import firebase from 'firebase/compat/app';
import { elementAt } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TraitementService {
 
  public traitement:any;
  public data:any[]=[];
  public duration:any;
  private dbPath = '/traitement';
  traitRefCollection: AngularFirestoreCollection<Traitement>;

  traitRefDoc: AngularFirestoreDocument<any>;
  tableData: any[] = [];

  constructor(public db: AngularFirestore) { 
    try{
      this.traitRefCollection = db.collection(this.dbPath);
    }catch (e){
      console.log(e);
    } 
 }

  
 createTraitement(traitement: Traitement) :any{
  return this.traitRefCollection.
  doc(traitement.id_trait)
  .set({...traitement})
   
}


  async getTraitmentByID(id:string){
    this.traitRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return new Promise((resolve, reject) => {
      this.db.doc(this.dbPath+`/${id}` )
        .get().subscribe((one)=> {
          // console.log(one.data())
          resolve(one.data())
          
        }
      )
    })
  }

  async getAllTraitement() {
    return new Promise((resolve, reject) => {
      this.db
        .collection("traitement",ref=>ref.orderBy('rdv.date','desc'))
        .get()

        .subscribe((ss:any) => {   this.data=[];

          ss.docs.forEach((doc:any) => {
            var object:any=doc.data().etat
            if(object[object.length-1].title != 'archiver'){
              this.data.push(doc.data());
              // console.log(doc.data().payed)
            }
         

          });
          resolve(this.data);

        })
    })

  }
  async getAllTrait() {
    return new Promise((resolve, reject) => {
      this.db
        .collection("traitement")
        .get()

        .subscribe((ss:any) => {   this.data=[];

          ss.docs.forEach((doc:any) => {
            var object:any=doc.data().etat
              this.data.push(doc.data());
              // console.log(doc.data().payed)
         

          });
          resolve(this.data);

        })
    })

  }
  async getAllTraitementArchiver() {
    return new Promise((resolve, reject) => {
      this.db
        .collection("traitement",ref=>ref.orderBy('rdv.date','desc'))
        .get()

        .subscribe((ss:any) => {   this.data=[];

          ss.docs.forEach((doc:any) => {
            var object:any=doc.data().etat
            if(doc.data().etat[doc.data().etat.length-1].title == 'archiver'){

                this.data.push(doc.data());
                // console.log(doc.data().payed)
              
         
            }
          });
     
          resolve(this.data);

        })
    })

  }


  getAll(id:any) {
    let date:any = new Date();
    let dateJours=(date.getTime()/86400000)
    return new Promise((resolve, reject) => {
      this.db
        .collection("traitement",ref=>ref.where('rdv.time','<=',dateJours+1).where('rdv.time','>=',dateJours-0.05).where('id_cmd','==', id ))
        .get()

        .subscribe((ss:any) => {   
          this.data=[];

          ss.docs.forEach((doc:any) => {
            console.log(doc.data().etat[doc.data().etat.length-1] )
            if(doc.data().etat[doc.data().etat.length-1].title != 'archiver'){
              this.data.push(doc.data());
              console.log(dateJours)
              console.log(doc.data().rdv.time)
    
              console.log(dateJours+1)
            }
        

          });
          resolve(this.data);

        })
    })

  }
  update(id: string, data: any): Promise<void> {
    this.traitRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return this.traitRefDoc.update(data);
  }

  async clicSurarchive(id: string,idCmd:any){
    this.traitRefDoc = this.db.doc(this.dbPath+`/${id}`);
       this.traitRefDoc.set({etat:firebase.firestore.FieldValue.arrayUnion({title:'archiver',updateTime:new Date()})},{merge:true})
       this.db.collection('commandes').doc(idCmd).set({etat:firebase.firestore.FieldValue.arrayUnion({title:'archiver',updateTime:new Date()})},{merge:true})

      .catch(function(error: any) {
    console.error('Error writing document: ', error);
   });
  }

 async UpdateMerge(id:any){


       this.db.collection('traitement').doc(id).set({etat:firebase.firestore.FieldValue.arrayUnion({title:'accepter',updateTime:new Date()})},{merge:true})

  }
  
  lesArvchives(){
    return new Promise((resolve, reject) => {
    let date:any = new Date();
    let dateSeconds=(date.getTime()/86400000)
      this.db
        .collection("traitement",ref=>ref.where('rdv.time','<',dateSeconds-0.0278))
        .get()

        .subscribe((ss:any) => {  

          ss.docs.forEach(async (doc:any) => {
            var object:any=doc.data().etat

            if(object[object.length-1].title == 'terminer'){
               this.db.collection('traitement').doc(doc.data().id_trait).set({etat:firebase.firestore.FieldValue.arrayUnion({title:'archiver',updateTime:new Date()})},{merge:true})   
               this.db.collection('commandes').doc(doc.data().id_cmd).set({etat:firebase.firestore.FieldValue.arrayUnion({title:'archiver',updateTime:new Date()})},{merge:true})
            }
          }); 

        })
    })




  }

   updateEtat(){
    return new Promise((resolve, reject) => {
    let date:any = new Date();
    let dateJours=(date.getTime()/86400000)

      this.db
      .collection("traitement",ref=>ref.where('rdv.time','<=',dateJours).where('rdv.time','>=',dateJours-0.027))
        .get()
        .subscribe((ss:any) => {  
          ss.docs.forEach(async (doc:any) => {   
            var object:any=doc.data().etat

            if(object[object.length-1].title == 'accepter'){

                   this.db.collection('traitement').doc(doc.data().id_trait).set({etat:firebase.firestore.FieldValue.arrayUnion({title:'en traitement',updateTime:new Date()})},{merge:true})   
                   this.db.collection('commandes').doc(doc.data().id_cmd).set({etat:firebase.firestore.FieldValue.arrayUnion({title:'en cours',updateTime:new Date()})},{merge:true}) .then(()=>{

                  console.log('done')
                })}

            console.log(doc.data().rdv.time)

          });

        })
    })
  }
  
  updateEtatContinue(){
    return new Promise((resolve, reject) => {
    let date:any = new Date();
    let dateJours=(date.getTime()/86400000)

      this.db
      .collection("traitement",ref=>ref.where('rdv.time','<=',dateJours-0.0277))
        .get()

        .subscribe((ss:any) => {  
          ss.docs.forEach(async (doc:any) => {   
            var object:any=doc.data().etat

            if(object[object.length-1].title == 'en traitement'){
                 this.db.collection('traitement').doc(doc.data().id_trait).set({etat:firebase.firestore.FieldValue.arrayUnion({title:'terminer',updateTime:new Date()})},{merge:true})
                 this.db.collection('commandes').doc(doc.data().id_cmd).set({etat:firebase.firestore.FieldValue.arrayUnion({title:'terminer',updateTime:new Date()})},{merge:true}).then(()=>{
              console.log('done')
     
            })}
            console.log(doc.data().rdv.time)

          });

        })
    })
  }

}

