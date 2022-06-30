import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { initializeApp } from "firebase/app";
initializeApp(environment.firebase);
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './pages/users/user.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AppRoutingModule, routes } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ColdComponent } from './pages/cold/cold.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './services/authService/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatIconModule} from "@angular/material/icon";
import { ResetpasswordComponent } from './pages/auth/email/resetpassword/resetpassword.component';
import { ResetNewPasswordComponent } from './pages/auth/email/reset-new-password/reset-new-password.component';
import { ActionComponent } from './pages/auth/email/action/action.component';
import { EmailVerificationComponent } from './pages/auth/email/email-verification/email-verification.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { AngularFireStorageModule} from "@angular/fire/compat/storage";
import { MedicalRecordComponent } from './pages/user-profile/medical-record/medical-record.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommandeDetailComponent } from './pages/cold/consultation/consultation.component';
import {LogoutGuard} from "./pages/auth/logout.guard";
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';
import { FooterComponent } from './components/footer/footer.component';
import { TraitementService } from './services/Traitement/traitement.service';
import { TypeService } from './services/typeof-service/type.service';
import { PraticientService } from './services/particientServ/particient.service';
import { SpecialiteService } from './services/specialites/specialite.service';
import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool

import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdvicesComponent } from './pages/advices/advices.component';
import { AdvicesDetailsComponent } from './pages/advices/advices-details/advices-details.component';
import { UrgenceComponent } from './pages/urgence/urgence.component';
import { UrgenceDetailsComponent } from './pages/urgence/urgence-details/urgence-details.component';
import { PopupCreateComponent } from './pages/cold/popup-create/popup-create.component';
import { ArchivesComponent } from './pages/archives/archives.component';
import { ArchivesDetailsComponent } from './pages/archives/archives-details/archives-details.component';
import { AppointementsService } from './services/appointement/appointements.service';
import { Appointment } from './models/appointement/appointement.module';
import { NgToastModule } from 'ng-angular-popup'
import { AngularNotificationModule} from 'angular-notification-alert';
import { NgxDatesPickerModule } from 'ngx-dates-picker';
import { ClientComponentComponent } from './pages/client-component/client-component.component';
import { FichePatientComponent } from './pages/client-component/fiche-patient/fiche-patient.component';
import { OrdonnanceService } from './services/ordonnance/ordonnance.service';
import { OrdonnanceComponent } from './pages/ordonnance/ordonnance.component';
import { FileOfOrdonnanceComponent } from './pages/ordonnance/file-of-ordonnance/file-of-ordonnance.component';
import { FeedBackComponent } from './pages/feed-back/feed-back.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FeedBackService } from './services/feedBack/feed-back.service';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { DemoFlexyModule } from './demo-flexy-module';
import { AppointementComponent } from './pages/Appointement/appointement/appointement.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { MedicalRecordService } from './services/medicalRecord/medical-record.service';
import { DocumentService } from './services/document/document.service';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    ResetNewPasswordComponent,
    ActionComponent,
    EmailVerificationComponent,
    AdminLayoutComponent
  ],


  imports: [
    ComponentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatIconModule,
    NgbModule,
    NgbModule,
    MaterialModule,
    Appointment,
    NgToastModule,
    AngularNotificationModule,
    NgxDatesPickerModule,
    NgxStarRatingModule,
    DashboardModule,
    DemoFlexyModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [AuthService,LogoutGuard  , NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
