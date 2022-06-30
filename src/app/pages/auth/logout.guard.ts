import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Routes, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
@Injectable()
export class LogoutGuard implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var isConnected=localStorage.getItem('isConnected');
    console.log("isConnected : "+isConnected)

    if(isConnected=="true"){
      return false;
    }else{
      console.log("16 : "+isConnected)

      return true;
    }
  }


}
