import { SharedsService } from './../../../shareds/services/shareds.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthenService } from './../../../services/authen.service';
import { AccountService } from 'src/app/services/account.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
  constructor(
      private Builder:FormBuilder,
      private Account:AccountService,
      private Authen:AuthenService,
      private Alert:AlertService,
      private  modalService: BsModalService,
      private shareds:SharedsService
    ){
    this.initialCreateFormData();
    this.initialLoadUpdateData();
    // เพิ่ม position
    this.positionItem=this.shareds.positionItem;
   }
   modalRef: BsModalRef;
   form: FormGroup;
   positionItem: string[];
    //บันทึกข้อมูล
    onSubmit(){
      if(this.form.invalid) return this.Alert.someting_wrong();
      this.Account
      .onupdateProfile(this.Authen.getAuthenticated(),this.form.value)
      .then(()=> this.Alert.notify('แก้ไขข้อมูลสำเร็จ','info'))
      .catch(err=>this.Alert.notify(err.Message));

      // console.log(this.form.value);
    }

    // เปิด Modal dialog{
    openModal(template: TemplateRef<any>){
      console.log(template);
      this.modalRef=this.modalService.show(template);
    }


    //สร้างฟอร์ม
    private initialCreateFormData(){
      this.form=this.Builder.group({
        email:[''],
        firstname:['',Validators.required],
        lastname:['',Validators.required],
        position:['',Validators.required],
        image:[null]
      });

      // disabled email
      this.form.get("email").disable();
    }

    //แปลงไฟล์รูปเป็น Base64
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

      // โหลดข้อมูลใหม่พร้อมกับ Update form Data
    private initialLoadUpdateData(){
      this.Account
      .getUserLogin(this.Authen.getAuthenticated())
      .then(user=>{

        this.form.controls['email'].setValue(user.email);
        this.form.controls['firstname'].setValue(user.firstname);
        this.form.controls['lastname'].setValue(user.lastname);
        this.form.controls['position'].setValue(user.position);
        this.form.controls['image'].setValue(user.image);

      })
      .catch(err=>this.Alert.notify(err.Message))
    }
}
