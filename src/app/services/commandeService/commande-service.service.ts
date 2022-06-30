import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Commande } from 'src/app/models/commande/commande.module';
import { Router } from '@angular/router';
import { UserService } from '../userService/user.service';
import { TraitementService } from '../Traitement/traitement.service';
import { User } from 'src/app/models/user/user.module';
import { Traitement } from 'src/app/models/traitement/traitement.module';
@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {

  public commande: any;
  public data: any[]=[];
  private dbPath = 'commandes';
  commandeRefCollection: AngularFirestoreCollection<Commande>;
  commandeRefDoc: AngularFirestoreDocument<any>;
  users: User[] = [];
  commandes: any;
  traitements: Traitement[] = [];

  constructor(public db: AngularFirestore, public router: Router, public userService: UserService, public traitementService: TraitementService) {
    try {
      this.commandeRefCollection = db.collection(this.dbPath);
    } catch (e) {
      console.log(e);
    }
  }



  // async getCommandeById(id: string) {
  //   this.commandeRefDoc = this.db.doc(this.dbPath + `/${id}`);
  //   return new Promise((resolve, reject) => {
  //     this.db.doc(this.dbPath + `/${id}`)
  //       .get().subscribe((one) => {
  //         resolve(one.data())

  //       }
  //       )
  //   })
  // }



  async getCommandeAdvice() {
    this.data = [];
    return new Promise((resolve, reject) => {
      this.db
        .collection("commandes", ref => ref.where('categorie', '==', '0').orderBy('createTime','asc'))
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            this.data.push(doc.data());
          });
        resolve(this.data);
        })
    })

  }


  createCommande(commande: Commande): any {
    return this.commandeRefCollection.
      doc(commande.uid_cmd)
      .set({ ...commande })

  }

  update(id: string, data: any): Promise<void> {
    this.commandeRefDoc = this.db.doc(this.dbPath + `/${id}`);
    return this.commandeRefDoc.update(data);
  }

  async getCommandeCold() {
    this.data = [];
    return new Promise((resolve, reject) => {
      this.db
        .collection("commandes", ref => ref.where('categorie', '==', '1').orderBy('createTime','asc'))
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            this.data.push(doc.data());
          });
        resolve(this.data);
        })
    })

  }

  async getCommandeUrgence() {
    this.data = [];
    return new Promise((resolve, reject) => {
      this.db
        .collection("commandes", ref => ref.where('categorie', '==', '2').orderBy('createTime','asc'))
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            this.data.push(doc.data());
          });
        resolve(this.data);
        })
    })

  }


  async getAllCommandeCold(id:any) {
    this.data=[];

    return new Promise(async (resolve, reject) => {

       this.db
        .collection("commandes", (ref: any) => ref.where('uid_cmd','==',id))
        .get()
        .subscribe((ss:any) => {    

          ss.docs.forEach((doc:any) => {

            this.data=(doc.data());

          });
          resolve(this.data);
          // console.log(this.data)


        })
    })

  }





  async delete(traitmentId: any, commandeID: any) {
   this.db.collection('commandes').doc(commandeID).delete();
    
   this.db.collection('traitement').doc(traitmentId).delete()

  }
 
}