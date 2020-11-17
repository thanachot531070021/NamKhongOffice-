import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedsService{
    
    //ตำแหน่งของสมาชิก
    positionItem: any[]=[
        'front end developer',
        'Back end developer'
    ];


    //แปลงไฟล์รูปเป็น Base64
  onConvertImage(input: HTMLInputElement){

    return new Promise((resolve,rejects)=>{
        const imageType =['image/jpg','image/png']
        const imageSize=300;
      // หากไม่มีการอัพโหลดภาพ
        if (input.files.length==0)
        return resolve(null);
      //ตรวจสอบชนิดไฟล์ที่เข้ามา
        if(imageType.indexOf(input.files[0].type)<0)
        {
        return rejects({Message:'กรุณาอัพโหลดไฟล์ รูปภาพเท่านั้น'});
        }

        //ตรวจสอบขนากของรูปภาพ
        if(input.files[0].size/1024 > imageSize )
            return rejects ({Message: `กรุณากรุณาอัพโหลดพาไม่เกิน ${imageSize} KB`});

        const reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        //คือค่า Image Base64 ออกไป
        reader.addEventListener('load',()=> resolve(reader.result));
    });
  }
}



