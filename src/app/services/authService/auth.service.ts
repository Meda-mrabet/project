import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../../models/loginData.model';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../../models/user/user.module';
import { Roles } from '../../models/user/role.module';
import {checkActionCode} from "@angular/fire/auth";
import { getAuth,RecaptchaVerifier } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  user : User ;
  currentUser: any;
  phoneNumber:any;
  recaptchaVerifier:any

  constructor(public afs: AngularFirestore, private authF: AngularFireAuth , private router:Router ) {

    this.authF.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        // add users to local storage
        localStorage.setItem('user', JSON.stringify(this.userData));
        //console.log("users email : "+this.userData.email);
      } else {
        localStorage.setItem('user', '');
      }
    });
  }

  get windowRef() {
    return window
  }

  login({email, password}: LoginData) {
    return this.authF.signInWithEmailAndPassword( email, password);
  }

  register({ email, password }: LoginData) : Promise<firebase.auth.UserCredential>{
    return this.authF.createUserWithEmailAndPassword( email, password);
  }

  sendEmailVerification(){
    this.current_User().then(user => {
      user.sendEmailVerification()
    });
  }

  resetpassword(email:any){
    return this.authF.sendPasswordResetEmail(email)
      .then(data => {
        console.log(data);
        // this.presentToast('Password reset email sent',  'bottom', 1000); // this is toastController
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log(` failed ${err}`);
        // this.error = err.message;
      });
  }

  setNewPassword(code:any,password:any){
    this.authF
      .confirmPasswordReset(code, password)
      .then(() => this.router.navigate(['login']))
      .catch(err => {
        // const errorMessage = FirebaseErrors.Parse(err.code); // check this helper class at the bottom
        console.log(err);
        alert( 'The code is invalid or you arrived at this page in an unwanted way')
      });
  }

  verifyEmail(code:any){
    this.authF
      .applyActionCode(code)
      .then( () => {
        this.authF.currentUser.then((user) => {
          this.SetUserData(user); //that's for emailVerified:true
          alert('your email has verified !')
        })
      }).catch(err => {
      console.log(err);
      alert('The action code is invalid.');
      // show error message
    });
  }

  loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.authF.signInWithPopup(new firebase.auth.GoogleAuthProvider()  );
  }

  SetUserData(user: any ) { 
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      firstName:"" ,
      lastName: "",
      photoURL: user.photoURL,
      phoneNumber:user.phoneNumber,
      roles:{user:true},
      emailVerified:true ,//user.emailVerified,
      position:{}
      
    };
    userRef.set(userData, {
      merge: true
    });
    return userData ;
  }

  current_User(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.authF.currentUser.then((user) => {
        console.log(user)
        resolve(user);
      });
    })
  }

  // roles and rights management
  canRead(user : User ):boolean{
    const allowed =['admin','doc','nurse','client'];
    return this.chekAuthorization(user , allowed);
  }

  canEdit(user : User ):boolean{
    const allowed =['admin','doc'];
    return this.chekAuthorization(user , allowed);
  }

  canDelete(user : User ):boolean{

    const allowed =['admin'];

    return this.chekAuthorization(user , allowed);
  }

  private  chekAuthorization(user : User , alloweRoles : string []):boolean{

    if( !user ) return false ;
    for(const role of alloweRoles){
      if( user.roles &&  role in user.roles)
        return true ;
    }
    return false ;
  }



  logout() {
    // remove users from local storage
    localStorage.removeItem('token');
    localStorage.setItem('isConnected', 'false');
    localStorage.removeItem('user');
    return  this.authF.signOut();
  }


}
