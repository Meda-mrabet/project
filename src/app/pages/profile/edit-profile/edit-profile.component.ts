import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/authService/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/userService/user.service";
import {FormGroup} from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from "../profile.component";
import {FileUpload} from "../../../models/file-upload/file-upload.module";
import {FileUploadService} from "../../../services/fileUploadService/file-upload.service";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() id: string;
  // @Input() fileUpload!: FileUpload;
  // fileUpload!: FileUpload;


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
    address  : '',
    position : [0],

  } ;

    constructor(private authService:AuthService , private router: Router,
                private userService : UserService, private localuser : ProfileComponent
                ,public activeModal: NgbActiveModal,private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
    if (this.id)
      this.userService.getUserByID(this.id).then((res) => {
      this.user=res;
      this.src=this.user.photoURL;
    }).catch((err) => {
    console.log(err);
  })
  }

  changePicture() {
    this.src = this.currentFileUpload?.url;
  }


  getOneUser(id: string) {
    return this.userService.getUserByID(id).then((res) =>
      this.user=res )}

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
    this.closeModal(),
    console.log("the profile updated successfully");
  }

  closeModal() {
    this.activeModal.close();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }


  async upload(): Promise<void> {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        // this.user.photoURL=this.currentFileUpload?.url;

        await this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);

          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  deleteImage(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }



}
