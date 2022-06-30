import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user/user.module';
import { UserService } from 'src/app/services/userService/user.service';
import {  ViewChild, ElementRef } from '@angular/core';
import jspdf from "jspdf";
import html2canvas from "html2canvas";
@Component({
  selector: 'app-fiche-patient',
  templateUrl: './fiche-patient.component.html',
  styleUrls: ['./fiche-patient.component.css']
})
export class FichePatientComponent implements OnInit {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  @Input() userInput: any;
  user: User;
  constructor(private userService:UserService, public activeModal: NgbActiveModal,config: NgbModalConfig) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  async ngOnInit(): Promise<void> {
    if (this.userInput) {

      this.user = this.userInput;

      await this.getUserByid(this.userInput.uid);

    }
  }

  async getUserByid(id: string) {
    this.userService.getUserByID(id).then(user_ => {
    console.log(user_) 
      });
   }
   public captureScreen() {
    var data:any = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 150;
      var pageHeight = 100;
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
