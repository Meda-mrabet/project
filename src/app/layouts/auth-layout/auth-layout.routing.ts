import { Routes } from '@angular/router';
import { ActionComponent } from 'src/app/pages/auth/email/action/action.component';
import { ResetpasswordComponent } from 'src/app/pages/auth/email/resetpassword/resetpassword.component';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { LogoutGuard } from 'src/app/pages/auth/logout.guard';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';


export const AuthLayoutRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] }, //,canActivate: [LogoutGuard] //after lougout delete token token
    { path: 'register', component: RegisterComponent ,canActivate: [LogoutGuard] },
    { path: 'resetpassword', component: ResetpasswordComponent  },
    // { path: 'reset-new-password', component: ResetNewPasswordComponent  },
    // { path: 'verify-email', component: EmailVerificationComponent  }, //,canActivate: [AngularFireAuthGuard]
    { path: 'auth/action', component: ActionComponent  }, //,canActivate: [AngularFireAuthGuard]
];
