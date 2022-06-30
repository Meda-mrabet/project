import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl } from '@angular/forms';
import { Route } from '@angular/router';
import { Ordonnance } from 'src/app/models/ordonnance/ordonnance.module';
import { OrdonnanceService } from 'src/app/services/ordonnance/ordonnance.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FileOfOrdonnanceComponent } from './file-of-ordonnance/file-of-ordonnance.component';
const moment = _rollupMoment || _moment;
import {MatDialog} from '@angular/material/dialog';
import { disableDebugTools } from '@angular/platform-browser';

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'll',
  },
  display: {
    dateInput: 'll',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'll',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css'],
  providers: [ NgbModalConfig,
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class OrdonnanceComponent implements OnInit {
  date = new FormControl(moment(new Date()).format("DD/MM/YYYY"));


constructor(public dialog: MatDialog,public db: AngularFirestore, private formBuilder: FormBuilder, private angularFireStore: AngularFirestore , private ordonnanceService:OrdonnanceService, private modal: NgbModal) { }

ngOnInit(): void {
  console.log(this.date.value)
}
submitted=false;

ordonnance: any = 
{
lastName:'',
firstName:'',
date:'',
city:'',
nameOfCreated:'',
uid:this.angularFireStore.createId(),
description:''
}



async newOrdonnance(): Promise<void> {
  this.submitted = false;

}

async saveOrdonnance(ordonnance:any): Promise<void> {
  
    this.ordonnance.date=moment(this.date.value._d).format("DD/MM/YYYY")
      this.ordonnanceService.creat(this.ordonnance).then(() => {

      this.submitted = true;
      
      console.log('Created new item successfully!');

    }
    ).then(()=>{
      const dialogRef = this.dialog.open(FileOfOrdonnanceComponent,{
        width:'40%',
        height:'150%'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
      dialogRef.componentInstance.ordonnanceInput = ordonnance;
      dialogRef.disableClose = true;

    })
  


}

cleanUser() {
  //cleaning
  this.ordonnance ={
    lastName:'',
    firstName:'',
    date:'',
    city:'',
    nameOfCreated:'',
    uid:'',
    description:''
    }
 
}
async saveHours() {

    console.log(this.date.value._d)
  
       

}

}

