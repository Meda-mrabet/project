import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/authService/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/userService/user.service";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FileUpload } from 'src/app/models/file-upload/file-upload.module';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  userForm!: FormGroup;
  user:any;
  src:string | undefined;

    roles : ['user','client','doc','nurse'];
  Currentuser = {
    uid: '',
    email: '',
    displayName: '',
    photoURL:'',
    emailVerified: true,
    roles : {
      user  :true,
      client:false,
      admin :false,
      doc   :false,
      nurse :false
    },
    address  : {
      latitude:'',
      longitude:'',
      city:''
    },
    position : [0],

  } ;
  public localUser : any ;

  constructor(private authService: AuthService, private router: Router,
              private userService : UserService,  private modal: NgbModal) { }

  async ngOnInit() {
     this.getOne();
    if (this.localUser?.uid)
      this.userService.getUserByID(this.localUser?.uid).then((res) => {
      this.user=res;
      this.src=this.user.photoURL;
    }).catch((err) => {
    console.log(err);
  })
  }

  async getOne(){
    this.localUser =  JSON.parse(localStorage.getItem("user")|| "");
    console.log(this.localUser)

    if(this.localUser)
      this.userService.getUserByID( this.localUser.uid).then( user_ =>{
        this.localUser = user_;
      });
  }

  emailVerification() {
    // this.localUser?.sendEmailVerification();
    this.authService.sendEmailVerification();
  }

  editModal() { //user: User
    const modalRef = this.modal.open(EditProfileComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = this.localUser?.uid;
  }
  async onUpdate() {
    console.log(this.user)
    if(this.currentFileUpload?.url){
      this.user.photoURL=this.currentFileUpload?.url;
    }
    await this.userService.update(this.user.uid, this.user).then((r) =>{
        this.router.navigate(['/profile']).then(() => {
        window.location.reload();
      })
    } );
   
    console.log("the profile updated successfully");
  }
  save() {
    console.log(this.localUser)
    if (this.localUser.uid!) {
      this.userService.update(this.localUser.uid,
      this.localUser).then(() =>  { 
          window.location.reload()
        })
      console.log("update old users");
    }
    //cleaning
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



}
