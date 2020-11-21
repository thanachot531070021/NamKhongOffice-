import { rejects } from 'assert';
import { resolve } from 'dns';
import { AuthenService } from './../services/authen.service';
import { IRoleAccount, AccountService } from 'src/app/services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(
    private authen:AuthenService,
    private account:AccountService
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise<boolean>((resolve,reject)=>{
        const roles:IRoleAccount  []= next.data.roles;
        this.account
        .getUserLogin(this.authen.getAuthenticated())
        .then(userLogin=>{
          if(roles.filter(item=>item==userLogin.role).length>0)
          
          resolve(true);
          else
          resolve(false);

          // console.log(userLogin);
        })
        .catch(()=>resolve(false));
      });
      //  console.log(roles);
    return false;
  }
  
}
