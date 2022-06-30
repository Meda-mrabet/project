import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { ResetpasswordComponent } from '../../pages/auth/email/resetpassword/resetpassword.component';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'; //AngularFireAuthGuard,  //userFireBase \\ the AuthGuard for User
import { ColdComponent } from '../../pages/cold/cold.component';
import { UserComponent } from '../../pages/users/user.component';
import { ProfileComponent} from "../../pages/profile/profile.component";
import { ActionComponent} from "../../pages/auth/email/action/action.component";
import { MedicalRecordComponent} from "../../pages/user-profile/medical-record/medical-record.component";
import {AuthGuard} from "@angular/fire/auth-guard";
import {LogoutGuard} from "../../pages/auth/logout.guard";
import {
  PageNotFoundComponentComponent
} from "../../pages/page-not-found-component/page-not-found-component.component";
import { AdvicesComponent } from '../../pages/advices/advices.component';
import { UrgenceComponent } from '../../pages/urgence/urgence.component';
import { ArchivesComponent } from '../../pages/archives/archives.component';
import { ClientComponentComponent } from '../../pages/client-component/client-component.component';
import { OrdonnanceComponent } from '../../pages/ordonnance/ordonnance.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AppointementComponent } from '../../pages/Appointement/appointement/appointement.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

export const AdminLayoutRoutes: Routes = [

    { path: 'profile', component: ProfileComponent ,
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },},
  
      { path: 'dashboard', component: DashboardComponent ,
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },},
  
    { path: 'ordonnance', component: OrdonnanceComponent ,
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },},
  
    { path: 'cold', component: ColdComponent ,
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },},
      { path: 'clients', component: ClientComponentComponent ,
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },},
      { path: 'appointement', component: AppointementComponent ,
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },},
      { path: 'user_profile', component: UserProfileComponent ,
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },},
  
    { path: 'advice', component: AdvicesComponent ,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },},
    { path: 'urgence', component: UrgenceComponent ,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },},
  
    { path: 'users', component: UserComponent ,
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    { path: 'archives', component: ArchivesComponent ,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },},
  
    { path: 'archives', component: ArchivesComponent ,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },},
    {path: '**',component:PageNotFoundComponentComponent}
  ];
  
  