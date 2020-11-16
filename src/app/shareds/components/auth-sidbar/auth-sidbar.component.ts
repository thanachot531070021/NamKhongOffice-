import { Component, OnInit } from '@angular/core';
import{AppURL} from '../../../app.url'
import{AuthURL} from '../../../authentication/authentication.url'
import { IAuthSidbarComponent } from './auth-sidbar.interface';
import { IAccount, AccountService } from '../../../services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-sidbar',
  templateUrl: './auth-sidbar.component.html',
  styleUrls: ['./auth-sidbar.component.css']
})
export class AuthSidbarComponent implements OnInit,IAuthSidbarComponent {

  constructor(
    private account:AccountService,
    private authen:AuthenService,
    private alert: AlertService,
    private router: Router
  ) { 
    this.initialLoadUserLogin();
  }

  ngOnInit(): void {
    
    
  }

  AppURL=AppURL;
  AuthURL=AuthURL;
  UserLogin:IAccount;

  //โหลดข้อมูล User ที่เข้าสู่ระบบ จาก Token
  private initialLoadUserLogin(){
    this.account
    .getUserLogin(this.authen.getAuthenticated())
    .then(userlogin=>this.UserLogin=userlogin)
    .catch(err => {
      this.alert.notify(err.Message);
      this.authen.clearAuthenticated();
      this.router.navigate(['/',AppURL.Login]);

    });
  }

}
