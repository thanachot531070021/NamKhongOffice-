import { Builder } from 'protractor';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedsService } from './../../../shareds/services/shareds.service';
import { Component, OnInit } from '@angular/core';
import { IMembersCreateComponent } from './member-create.interface';
import { IRoleAccount } from 'src/app/services/account.service';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements  IMembersCreateComponent{

  constructor(
      private shareds:SharedsService,
      private Builder:FormBuilder
  ) {
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
    console.log(this.form.value)
}


  //แสดงข้อมูลสิทธ์ผุ้ใช้ เป็นชื่อตัวหนังสือ
  getRoleName(role: IRoleAccount): string {
    return IRoleAccount[role];
    }

  //สร้างฟอร์ม
  private initialCreateFormData(){
      this.form=this.Builder.group({
        image:[],
          email:[],
          password:[],
          firstname:[],
          lastname:[],
          position:[''],
          role:['']

      });
  }

}
