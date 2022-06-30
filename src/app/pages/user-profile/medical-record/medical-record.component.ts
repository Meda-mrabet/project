import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {FileUploadService} from "../../../services/fileUploadService/file-upload.service";
import {map} from "rxjs/operators";
import { MedicalRecordService } from 'src/app/services/medicalRecord/medical-record.service';
import { User } from 'src/app/models/user/user.module';
import { DocumentService } from 'src/app/services/document/document.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
export interface Element {
  id: number;
  name: string;
  description: string;
  type: string;
  created_time:any;
  created_by:any;

  action: string;
  badge: string;
}
;
@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})



export class MedicalRecordComponent implements OnInit {
  @Input() userInput: any;

  fileUploads?: any[];
  UserInput: User;
  ELEMENT_DATA: any[]=[]

  displayedColumns: string[] = ['id', 'description','created_by', 'name','type', 'created_time', 'action'];
  dataSource:any
  ls: any ;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;  
  constructor(private _liveAnnouncer: LiveAnnouncer,private uploadService: FileUploadService,private medicalRecordService:MedicalRecordService ,private documentService:DocumentService) { }


  ngOnInit(): void {
    console.log(this.userInput)
    this.getRecords()
    // console.log(16)
    // this.uploadService.getFiles(6).snapshotChanges().pipe(
    //   map(changes =>
    //     // store the key
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // ).subscribe(fileUploads => {
    //   console.log(fileUploads)
    //   console.log(25)
    //   this.fileUploads = fileUploads;
    //   console.log(27)
    // });
    // console.log(30)

  }

  getRecords(){
    this.medicalRecordService.getAll(this.userInput.uid).then((data)=>{
      this.documentService.getAll(this.userInput.uid).then((data_:any)=>{
        this.ELEMENT_DATA  =[]

      data_.forEach((data:any, i=0)=>{
        console.log(data)
      this.ELEMENT_DATA.push({
        id:i+1,
        description:data.description,
        created_by:data.created_by, 
        created_time:data.created_date,
        name:data.name,
        type:data.type,
        badge: 'badge-info',
        action :data.file

      })
    })   
    this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
       })


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
      ;}
  deleteFileUpload(file: any) {
    this.uploadService.deleteFile(file);

  }
}
