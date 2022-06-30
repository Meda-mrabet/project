import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/authService/auth.service";
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  // email = this.authService.current_User();
  mode = this.activatedActivated.snapshot.queryParams['mode'];
  code = this.activatedActivated.snapshot.queryParams['oobCode'];

  constructor(private  authService: AuthService ,
             private activatedActivated: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
 this.authService.verifyEmail(this.code);

}



}
