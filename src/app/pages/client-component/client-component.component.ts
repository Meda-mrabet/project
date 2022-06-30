import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService } from '../../services/authService/auth.service';
import { UserService } from '../../services/userService/user.service';
import {User} from "../../models/user/user.module";
import {Roles} from '../../models/user/role.module';
import * as jspdf from 'jspdf';  
import { FichePatientComponent } from './fiche-patient/fiche-patient.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

export interface AllElement{
  No:number;
  Nom:any;
  Prenom:any;
  Email:any;
  Tel:any;
  Sexe:any;
  Address:any;
  FichePatient:any;
  Profile:any;

}

@Component({
  selector: 'app-client-component',
  templateUrl: './client-component.component.html',
  styleUrls: ['./client-component.component.css']
})
export class ClientComponentComponent implements OnInit {
user:User
componentShow=false
displayedColumns: string[] = ['No', 'Nom', 'Prenom', 'Email','Tel','Sexe','FichePatient','Profile'];
dataSource:any
ls: any ;
ELEMENT_DATA: any[] = []


@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer , public authService:AuthService , private router: Router,
    private userService : UserService ,private modal: NgbModal, config: NgbModalConfig, ) {
    //private modal: NgbModal
    config.backdrop = 'static';

    config.keyboard = false;
  }
  public users: User[]=[];

  async ngOnInit() {
    await this.getAll();
    console.log(this.users)
  }

  CreatePopUp(user:any) {
    const modalRef= this.modal.open(FichePatientComponent, {
      size: '100%',
      centered: true,
      windowClass: 'dark-modal',  

    },);

    modalRef.componentInstance.userInput = user;

  }

  async getAll(){

    this.userService.getAllClient().then((data:any) => {
       // @ts-ignore
       this.users= data;
       console.log(this.users)
       this.ELEMENT_DATA = []

       data.forEach((data: any, i = 0) => {
         console.log(data)
         this.ELEMENT_DATA.push({
           No: i + 1,
           Nom: data.lastName,
           Prenom: data.firstName,
           Email: data.email,
 
           Tel: data.phoneNumber,
           Sexe: data.sexe,
           FichePatient: '',
           Profile:''
         })
         this.dataSource = new MatTableDataSource<AllElement>(this.ELEMENT_DATA)
       })
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     }).catch((err) => {
       console.log(err);
     })
   }
   announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    ;
  }

send(user:any){

  user = user;
  this.user = user
  console.log(user)
  console.log(this.user)
  this.componentShow=true;
  
}

}
