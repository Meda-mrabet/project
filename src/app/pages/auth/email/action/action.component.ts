import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html'
})
export class ActionComponent implements OnInit {

  mode = this.activatedActivated.snapshot.queryParams['mode'];
  constructor(private activatedActivated: ActivatedRoute) {
  }

  ngOnInit(): void {
  }
  action(): string{
    if (this.mode == 'resetPassword'){
      return 'ChangePassword';
    }else if (this.mode == 'verifyEmail'){
      return 'EmailVerification';
    }else {
      return 'error';
    }
  }

}
