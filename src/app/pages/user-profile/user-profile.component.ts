import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user/user.module';
import { UserService } from 'src/app/services/userService/user.service';
import { MedicalRecordComponent } from './medical-record/medical-record.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() childMessage: User;

 
  constructor(public dialog: MatDialog, private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.childMessage)
  }

  save() {
    if (this.childMessage.uid!) {
      this.userService.update(this.childMessage.uid,
        this.childMessage).then(() =>  { 
          window.location.reload()
        });
      console.log("update old users");
    }
    //cleaning
  }

 

  async readMedicalRecords(user:any): Promise<void> {
  
 
      const dialogRef = this.dialog.open(MedicalRecordComponent,{
        width:'100%',
        height:'150%'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
      dialogRef.componentInstance.userInput = user;

}

}
