import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/authService/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetpasswordComponent implements OnInit {

  @Output() formData: EventEmitter<{
    email: string;

  }> = new EventEmitter();
  form!: FormGroup;

  constructor(private fb: FormBuilder,private  authService: AuthService ,
              private  router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  resetpassword(email:string){
  this.authService
    .resetpassword(email)
    .then((result) =>{
      //alert success
      this.router.navigate(['/login']);
    })
    .catch((e) => alert(e.message));
}

  onSubmit() {
    this.formData.emit(this.form.value);
    this.resetpassword(this.form.value.email);
  }

}
