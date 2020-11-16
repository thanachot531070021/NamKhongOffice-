import { Component, OnInit, Input } from '@angular/core';
import { IChangePasswordComponent } from './change-password.interface';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';
import { AccountService } from 'src/app/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { Console } from 'console';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements IChangePasswordComponent {

  constructor(
    private builder:FormBuilder,
    private alert:AlertService,
    private validators:ValidatorsService,
    private account:AccountService,
    private authen:AuthenService
  ) 
   {
    this.initialCreateFormData();
   }


  @Input('modalRef') modalRef: BsModalRef;
  form:FormGroup;

  // เปลี่ยนรหัสผ่าน
  onSubmit(){
    if (this.form.invalid) 
    return this.alert.notify("กรุณาตรวจสอบข้อมูล","warning")
    // console.log(this.form.value);
    this.account.OnChangPassword(this.authen.getAuthenticated(),this.form.value)
    .then(user=> {
      // console.log(user);
      this.alert.notify('เปลี่ยนรหัสสำเร็จ','info');
      this.modalRef.hide();
    })
    .catch(err=>this.alert.notify(err.Message));
  }

  // สร้างฟอร์ม
  private initialCreateFormData(){
    this.form=this.builder.group({
      old_pass:['',[Validators.required]],
      new_pass:['',[Validators.required,this.validators.isPassword]],
      cnew_pass:['',[Validators.required,this.validators.comparePassword('new_pass')]]

    });
  }

}
