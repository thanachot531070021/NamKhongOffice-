import { Injectable } from "@angular/core";
import { AbstractControl } from '@angular/forms';


@Injectable()

export  class ValidatorsService{
   
     //สร้างvalidation เอง โดยเช็ครหัสผ่าน และยืนยันรหัสผ่านให้เหมือนกัน
      comparePassword(passwordField: string){
        return function(confirm_password:AbstractControl){
          if (!confirm_password.parent) return;
          const password=confirm_password.parent.get(passwordField);
          const passwordSubscribe= password.valueChanges.subscribe(()=>{
              confirm_password.updateValueAndValidity();
              passwordSubscribe.unsubscribe();
          });
  
          if(confirm_password.value===password.value)
          return;
          return{compare:true}
  
        }
       }

      //ตรวจสอบ password  pattern A-z 0-9 6-15ตัว
       isPassword(password: AbstractControl){
         if(password.value=='') return;
         if(/^[A-z0-9]{6,15}$/.test(password.value)) return;
         return{password: true};
       }
}

