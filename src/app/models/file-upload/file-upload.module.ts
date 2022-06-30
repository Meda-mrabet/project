import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FileUpload {

  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
