import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MaterialModule
  ],
  declarations: [
NavbarComponent,
FooterComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
