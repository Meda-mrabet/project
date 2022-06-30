import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResetpasswordComponent} from '../resetpassword/resetpassword.component';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/authService/auth.service";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.css']
})
export class ResetNewPasswordComponent implements OnInit {
  @Output() formData: EventEmitter<{
    password: string;
  }> = new EventEmitter();
  mode = this.activatedActivated.snapshot.queryParams['mode'];
  code = this.activatedActivated.snapshot.queryParams['oobCode'];
  form!: FormGroup;

  constructor(private fb: FormBuilder,private  authService: AuthService ,
              private  router: Router,private activatedActivated: ActivatedRoute) {

  }

  ngOnInit(): void {

    // frmSetNewPassword
    this.form = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }


  get password() {
    return this.form.get('password');
  }
  setnewpassword(password:any){
    console.log(password);

  }

  onSubmit() {

    this.formData.emit(this.form.value);
    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      alert( 'Confirm the password The password again ')
      return;
    }else{
      this.authService.setNewPassword(this.code,password);
     }
  }
}
