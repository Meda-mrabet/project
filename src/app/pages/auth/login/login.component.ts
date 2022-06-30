import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from '../../../models/loginData.model';
import { User } from '../../../models/user/user.module';
import { Roles } from '../../../models/user/role.module';
import { AuthService } from '../../../services/authService/auth.service';
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();

  form!: FormGroup;
  user: User ;
  roles : Roles;
  constructor(private fb: FormBuilder , private  authService: AuthService,
              private  router: Router, private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then((result) =>{
      console.log(result.user)
        this.user  =   this.authService.SetUserData(result.user );
        this.router.navigate(['/dashboard']);
        this.appComponent.Connected();
        // this.appComponent.isConnected=true;
        this.appComponent.getOne().then(r => console.log(" 52 login comp: "+r));
      })
      .catch((e) => alert(e.message));
  }
  onSubmit() {
    this.formData.emit(this.form.value);
    this.login(this.form.value);
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }

}


