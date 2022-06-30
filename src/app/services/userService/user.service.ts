import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../../models/user/user.module';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public data:any[]=[];
  private dbPath = '/users';
  //public dbL: AngularFirestore
  usersRefCollection: AngularFirestoreCollection<User>;
  usersRefDoc: AngularFirestoreDocument<any>;


  constructor( public db: AngularFirestore) {
    try{

      this.usersRefCollection = db.collection(this.dbPath);

    }catch (e){
      console.log(e);
    }
  }

  creat(user: User) {//: Promise<void>
    this.usersRefDoc = this.db.doc(this.dbPath+`/${user.uid}`);
    return this.usersRefDoc.set(user);

  }
  createClient(user: User) :any{
    return this.usersRefCollection.doc(user.uid)
        .set({...user},{merge:true})
     
  }
 
  getAllClient(){

    this.data=[];


    return new Promise((resolve, reject) => {
      this.db
        .collection("users",ref=>ref.where('roles.user','==',true).where('roles.client','==',true).orderBy('lastName','asc'))
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            this.data.push(doc.data());
          });
          resolve(this.data);
        })
    })
  }

  async getAllUsers() {
    this.data=[];


    return new Promise((resolve, reject) => {
      this.db
        .collection("users",ref=>ref.orderBy('lastName','asc'))
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            this.data.push(doc.data());
          });
          resolve(this.data);
        })
    })
  };
  
   getAllUsersByCmd(id:any) {
    this.data=[];
    return new Promise((resolve, reject) => {
      this.db
        .collectionGroup("users",ref=>ref.where('uid','==',id))
        .get()
        .subscribe((ss:any) => {
          ss.docs.forEach((doc:any) => {
            this.data=(doc.data());
            // console.log(doc.data().uid);

          });
          resolve(this.data);

        })
    })
  };

  async getUserByID(id:string){
    this.usersRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return new Promise((resolve, reject) => {
      this.db.doc(this.dbPath+`/${id}`)
       .get().subscribe((one:any)=> {
          // console.log(one.data())

          resolve(one.data())
        }
      )
    })
  }

  // getOne(id:string): Observable<User>{
  //   this.usersRefDoc = this.db.doc(this.dbPath+`/${id}`);
  //   return this.usersRefDoc.valueChanges();
  // }

  getAll(): AngularFirestoreCollection<User> {
    return this.usersRefCollection;
  }

  getMedicalRecord(userId: string) {
    this.data=[];
    return new Promise((resolve, reject) => {
      this.db
        .collection("medicalRecord")
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            // @ts-ignore
            if(doc.data().uid == userId)
            this.data.push(doc.data());
          });
          // if(this.data)
          resolve(this.data);
          //console.log(this.data);
        })
    })

  }


  update(id: string, data: any): Promise<void> {
    this.usersRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return this.usersRefDoc.update(data);
  }

  delete(id: string): Promise<void> {
    this.usersRefDoc = this.db.doc(this.dbPath+`/${id}`);
    return this.usersRefDoc.delete();
  }

 
}
