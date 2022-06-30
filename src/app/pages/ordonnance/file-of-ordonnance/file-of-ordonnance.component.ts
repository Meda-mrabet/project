import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user/user.module';
import { UserService } from 'src/app/services/userService/user.service';
import {  ViewChild, ElementRef } from '@angular/core';
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import { OrdonnanceService } from 'src/app/services/ordonnance/ordonnance.service';
import { Ordonnance } from 'src/app/models/ordonnance/ordonnance.module';

@Component({
  selector: 'app-file-of-ordonnance',
  templateUrl: './file-of-ordonnance.component.html',
  styleUrls: ['./file-of-ordonnance.component.css']
})
export class FileOfOrdonnanceComponent implements OnInit {
  @Input() ordonnanceInput: any;
  ordonnance:Ordonnance
  constructor(private userService:UserService, public activeModal: NgbActiveModal,config: NgbModalConfig ,private ordonnanceService:OrdonnanceService ) { 
    config.backdrop = 'static';
    config.keyboard = false;
 }



  async ngOnInit(): Promise<void> {
    console.log(this.ordonnanceInput)
    if (this.ordonnanceInput) {

      this.ordonnance = this.ordonnanceInput;

      await this.getOrdonnanceByid(this.ordonnanceInput.uid);

    }
  }
  async getOrdonnanceByid(id: string) {
    this.ordonnanceService.getOrdonnanceByID(id).then(user_ => {
    console.log(user_) 
      });
   }


  public captureScreen() {
    var data:any = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 210;
      var pageHeight = 170;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("file.pdf"); // Generated PDF
    });
  }

   closeModal() {
    disableClose: true

   this.activeModal.close();
 }

}
