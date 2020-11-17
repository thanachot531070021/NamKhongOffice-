import { AuthURL } from './../../authentication.url';
import { AppURL } from './../../../app.url';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MemberService } from './../../services/members.service';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';
import { Builder } from 'protractor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedsService } from './../../../shareds/services/shareds.service';
import { Component, OnInit } from '@angular/core';
import { IMembersCreateComponent } from './member-create.interface';
import { IRoleAccount } from 'src/app/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers:[MemberService]
})
export class MemberCreateComponent implements  IMembersCreateComponent{

  constructor(
      private shareds:SharedsService,
      private Builder:FormBuilder,
      private Alert:AlertService,
      private Validators:ValidatorsService,
      private Member:MemberService,
      private Router:Router,
      private activatedRouter:ActivatedRoute
  ) {
    this.activatedRouter.params.forEach(params =>{
      console.log(params);
    });

    

    this.initialCreateFormData();
    // เพิ่ม position
    this.positionItem=this.shareds.positionItem
    
   }
 
      form:FormGroup;
      positionItem: string[];
      roleItem: IRoleAccount[]=[
      IRoleAccount.Member,
      IRoleAccount.Employee,
      IRoleAccount.Admin
  ];

    // บันทึกหรือแก้ไขข้อมูล

  onSubmit(): void {  
    if(this.form.invalid)
    return this.Alert.someting_wrong();
    this.Member
    .createMember(this.form.value)
    .then(res=>{
      this.Alert.notify('บันทึกข้อมูลสำเร็จ','info');
      this.Router.navigate(['/',AppURL.Authen,AuthURL.Members]);
    })
    .catch(err=> this.Alert.notify(err.Message));
}


  //แสดงข้อมูลสิทธ์ผุ้ใช้ เป็นชื่อตัวหนังสือ
  getRoleName(role: IRoleAccount): string {
    return IRoleAccount[role];
    }


  //แสดงตัวอย่างภาพอัพโหลด
  onConverImage(input: HTMLInputElement){
      const imageControls = this.form.controls['image'];
      this.shareds
        .onConvertImage(input)
        .then(base64 => imageControls.setValue(base64))
        .catch(err=> {
          input.value=null;
          imageControls.setValue(null);
          this.Alert.notify(err.Message);
        });
    }


  //สร้างฟอร์ม
  private initialCreateFormData(){
      this.form=this.Builder.group({
          image:[],
          email:['',[Validators.required,Validators.email]],
          password:['',[Validators.required,this.Validators.isPassword]],
          firstname:['',Validators.required],
          lastname:['',Validators.required],
          position:['',Validators.required],
          role:['',Validators.required]

      });
  }

}
