import { AppURL } from './../../app.url';
import { Component, OnInit } from '@angular/core';
import { ILoginComponent } from './login.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AccountService } from 'src/app/services/account.service';
import { resolve } from 'dns';
import { error } from '@angular/compiler/src/util';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {
  constructor(
    private  builder: FormBuilder,
    private  alert: AlertService,
    private  router: Router,
    private  account: AccountService,
    private  authen: AuthenService,
    private  activatedRoute:ActivatedRoute
    
  ) {
    //เก็บค่า returnURL เพื่อ redirect หลังจาก login
    this.activatedRoute.params.forEach(params=>{
      this.retuenURL=params.returnURL || `/${AppURL.Authen}`;
      // console.log(this.retuenURL);
    })
    this.initialCreateFormData();    
    // console.log(this.authen.getAuthenticated());
   }

  Url = AppURL;
  form: import("@angular/forms").FormGroup;
  retuenURL:string;

  //เข้าสู้ระบบ
  onSubmit(): void {
    if (this.form.invalid)
    return this.alert.someting_wrong();

    this.account
        .onLogin(this.form.value)
        .then(res=>{
          //เก็บ session
          this.authen.setAuthenticated(res.accessToken)
          //เก็บ alert และ redirect หน้า
          this.alert.notify('เข้าสู่ระบบสำเร็จ','info')
         this.router.navigateByUrl(this.retuenURL);
        })
        .catch(err => this.alert.notify(err.Message));
        

    // console.log(this.form.value);
  }

 
       //สร้างฟอร์ม
       private initialCreateFormData(){
        this.form=this.builder.group({
       email:['',Validators.required],
       password:['',Validators.required],
       remember:[true]
       });
     }
 
}
