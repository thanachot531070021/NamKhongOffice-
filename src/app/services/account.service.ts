
import { Injectable } from "@angular/core";
import { IRegister } from 'src/app/components/register/register.interface';
import { ILogin } from 'src/app/components/login/login.interface';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { Interface } from 'readline';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { promise } from 'protractor';
import { assert } from 'console';
import { IProfile } from 'src/app/authentication/components/profile/profile.interface';
import { IChangePassword } from 'src/app/authentication/components/profile/change-password/change-password.interface';

@Injectable({
providedIn: 'root'
})

export  class AccountService{
   public mockUserItem:IAccount[]=[
        {
            id:1,
            firstname:'Admin',
            lastname: 'Test',
            email:'Jame1@gmail.com',
            password:'111111',
            position:'front end developer',
            role:IRoleAccount.Admin,
            image:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg',
            create:new Date,
            update:new Date

        },
        {
            id:2,
            firstname:'Employee',
            lastname: 'Test',
            email:'Jame2@gmail.com',
            password:'111111',
            position:'Back end developer',
            role:IRoleAccount.Employee,
            create:new Date,
            update:new Date

        },
        {
            id:3,
            firstname:'Member',
            lastname: 'Tests',
            email:'Jame3@gmail.com',
            password:'111111',
            position:'Back end developer',
            role:IRoleAccount.Member,
            create:new Date,
            update:new Date

        }
    ];

    //เปลี่ยนรหัสผ่านใหม่
    OnChangPassword(accessToken:string,model: IChangePassword){

        return new Promise((resolve,rejects)=>{
            const userProfile=this.mockUserItem.find(item=>item.id == accessToken);
            if(!userProfile) return rejects({Message:'ไม่มีข้อมูลผู้ใช้งาน'});
            if(userProfile.password !== model.old_pass) return rejects({Message:'รหัสผ่านเดิมไม่ถูกต้อง'});
            userProfile.password=model.new_pass;
            userProfile.update= new Date();
            resolve(userProfile);
        });
    }
    
    // แก้ไขข้อมูลส่วนตัว Update Profile
    onUpdateProfile(accessToken:string, model:IProfile){
    return new Promise((resolve, reject )=>{
        const userProfile =this.mockUserItem.find(user => user.id==accessToken);
        if(!userProfile) return reject({Message:'ไม่มีผูเใช้งานนี้ ในระบบ'});
        userProfile.firstname=model.firstname;
        userProfile.lastname=model.lastname;
        userProfile.position=model.position;
        userProfile.image=model.image;
        userProfile.update= new Date();
        resolve(userProfile);
    });
    }

    //ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก Token
    getUserLogin(accessToken:string){
        return new Promise<IAccount>((resolve,rejects) => {
            const userLogin = this.mockUserItem.find(m=>m.id == accessToken);
            if(!userLogin) return rejects({Message:'accessToken ไม่ถูกต้อง'});
            resolve(userLogin);
        });
    }

    //เข้าสู่ระบบ 
    onLogin(model: ILogin){
        return new Promise<{accessToken:string}>((resolve,rejects)=>{
            // resolve(model);
         const userLogin=  this.mockUserItem.find(Item=>Item.email==model.email&&Item.password==model.password)
          if (!userLogin) return rejects({Message:'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'});
        //   resolve (userLogin);
        resolve ({
            accessToken:userLogin.id
        });

        });
    }


    //ลงทะเบียน
    onRegister(model: IRegister){
    // console.log(model);
         return new Promise((resolve,reject)=>{
             const _model: IAccount= model;
             _model.id=Math.random();
             _model.image=null;
             _model.position='';
             _model.role=IRoleAccount.Member;
             _model.create= new Date();
             _model.update= new Date();
             this.mockUserItem.push(model);
            resolve(model);
            // reject({Message: 'ERROE from server! '});
    });

    }
}



export interface IAccount{
    firstname: string
    lastname: string
    email: string
    password: string

    id?:any;
    position?:string;
    image?:string;
    role?:IRoleAccount;
    create?:Date;
    update?:Date;
}   

export enum IRoleAccount{
    Member=1,
    Employee,
    Admin
}