import { Component, OnInit } from '@angular/core';
import{AppURL} from '../../../app.url'
import{AuthURL} from '../../../authentication/authentication.url'
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authen: AuthenService,
    private alear: AlertService

  ) { }

  ngOnInit(): void {
  }

  AppURL=AppURL;
  AuthURL=AuthURL;

  //ออกจากระบบ
  onLogout(){
    this.alear.notify("ออกจากระบบสำเร็จ","info")
    this.authen.clearAuthenticated();
    this.router.navigate(['/',AppURL.Login]);
  }
}
