import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../../../models/loginData.model';
import { AuthService } from '../../../services/authService/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../../../models/user/user.module';
import { UserService } from '../../../services/userService/user.service';
import { AppComponent } from '../../../app.component';
import {Roles} from "../../../models/user/role.module";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() formData: EventEmitter<{
    name: string;
    email: string;
    password: string;
    // agree_term:boolean;
  }> = new EventEmitter();
  // agree_term:boolean=false;
  form!: FormGroup;

  //userCre : any;
  user : User ;
 
  constructor(private fb: FormBuilder , private readonly authService: AuthService,
              private readonly router: Router , private userService : UserService , private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      // name: ['', [Validators.required, Validators.name  ]],
      name: new FormControl(),
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.formData.emit(this.form.value);
    this.register(this.form.value);
  }

  // get agree_term(){
  //   return this.form.get('agree_term');
  // }
  get name() {
    // if(this.form.get('name'))
    return this.form.get('name');
    // else return "";
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  register(data: LoginData) {
    this.authService
      .register(data)
      .then((result) =>{
        const tmpUser : User  =  this.authService.SetUserData(result.user);

        this.user = {
          uid: tmpUser.uid,
          email: tmpUser.email,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          position:{
            latitude:0,
            longitude:0
          },
          photoURL: "",
          emailVerified: false,
          address:{
            city:"",
            latitude:0,
            longitude:0
          },//this.form.value.address,
          roles: {user:true},
     
        }
        console.log(this.user)

        result.user?.sendEmailVerification();

        this.userService.creat(this.user);

        this.authService.login({email:data.email , password:data.password});
        this.appComponent.Connected();
        // this.appComponent.isConnected=true;
        this.appComponent.getOne().then(r => console.log("91 register comp: "+r));
        this.router.navigate(['/dashboard']);

      })
      .catch((e) =>
        alert(e.message),
      );
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(()=>
        this.authService.current_User().then((user)=>
          this.userService.creat(this.authService.SetUserData(user))

        ),
      ).then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }


  // async openLoader() {
  //   const loading = await this.loadingController.create({
  //     message: 'Please Wait ...',
  //     duration: 2000
  //   });
  //   await loading.present();
  // }
  // async closeLoading() {
  //   return await this.loadingController.dismiss();
  // }
  //
  // async presentToast(message, position, duration) {
  //   const toast = await this.toastController.create({
  //     message,
  //     duration,
  //     position
  //   });
  //   toast.present();
  // }





}
