import { Component } from '@angular/core';
import {AuthService} from "src/app/services/authService/auth.service";
import {Router} from "@angular/router";
import {UserService} from "src/app/services/userService/user.service";
import { environment } from "src/environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgToastService } from 'ng-angular-popup';

interface Alert {
  type: string;
  message: {
    title:string,
    body:string
    icon:any
  };
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent  {
  alerts: Alert[];

  title = 'My doctor';
  localUser : any ;
  key: string = 'isConnected';
  isConnected: string | null ='false';
  message:any = null;

  constructor(private authService: AuthService, private router: Router
    ,private userService : UserService,private db: AngularFirestore , private toast:NgToastService , ) {
      this.reset();

     }
 

    close(alert: Alert) {
      this.alerts.splice(this.alerts.indexOf(alert), 1);
    }
  
    reset() {
   
    }
  

    async ngOnInit() {
      this.isConnected = localStorage.getItem(this.key);
      await this.getOne();
     await  this.listen();
      this.requestPermission();
    }
    requestPermission() {
    
      const messaging = getMessaging();
      getToken(messaging, 
       { vapidKey: environment.firebase.vapidKey}).then(
         (token) => {
            const currentTokens = this.localUser.fcmTokens?this.localUser.fcmTokens  :  { }
            //      // If token does not exist in firestore, update db
            if (!currentTokens[token]) {
              const userRef = this.db.collection('users').doc(this.localUser.uid)
              const tokens = { ...currentTokens, [token]: true }
              userRef.update({ fcmTokens: tokens })
            }
            console.log("Hay we got the token.....");
             console.log(token);
  
       }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
      });
    }

    async listen() {
      const messaging = getMessaging();
       onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        this.message=payload;
        if(this.message.data.categorie == 1){
          this.alerts = Array.from([
            { type: 'primary', message: {title:this.message.notification.title,body:this.message.notification.body ,icon:this.message.data.icon } },
          ]);
        }else if(this.message.data.categorie == 0){
          this.alerts = Array.from([
            { type: 'warning', message: {title:this.message.notification.title,body:this.message.notification.body ,icon:this.message.data.icon } },
          ]);
        }else{
          this.alerts = Array.from([
            { type: 'danger', message: {title:this.message.notification.title,body:this.message.notification.body ,icon:this.message.data.icon } },
          ]);
        }
     
      });
    }
  
   

    async getOne(){
      if(this.isConnected == 'true') {
        this.localUser =  JSON.parse(localStorage.getItem("user")|| "");
        if(this.localUser)
          this.userService.getUserByID( this.localUser.uid).then( user_ =>{
            this.localUser = user_;
            // this.user=this.localUser;
          });
      }
    }
    Connected(){
      localStorage.setItem(this.key, 'true');
      this.isConnected = localStorage.getItem(this.key);
    }
  
  
    logout() {
      localStorage.setItem('isConnected', 'false');
      this.authService
        .logout()
        .then(() => this.router.navigate(['/login']))
        .then(()=>{
          window.location.reload();
        })
        .catch((e) => console.log(e.message));
    }
  
 links = [
   { path: '/cold', icon: 'home', title: 'Accueil' },
   { path: '/profile', icon: 'person', title: 'Profil' },

 ];

 examples = [
  { path: 'users', icon: 'face', title: 'Users' },
 ]


}
