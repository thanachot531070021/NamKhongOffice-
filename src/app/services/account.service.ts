import { HttpService } from './http.service';

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
    constructor(private http:HttpService
    ){}
   
    // store user login ไว้
    public UserLogin : IAccount= {} as any;
    public SetUserLogin(UserLogin:IAccount){
        this.UserLogin.id=UserLogin.id;
        this.UserLogin.firstname=UserLogin.firstname;
        this.UserLogin.lastname=UserLogin.lastname;
        this.UserLogin.email=UserLogin.email;
        this.UserLogin.password=UserLogin.password;
        this.UserLogin.position=UserLogin.position;
        this.UserLogin.role=UserLogin.role;
        this.UserLogin.image=UserLogin.image;
        this.UserLogin.created=UserLogin.created;
        this.UserLogin.updated=UserLogin.updated;
        
        return this.UserLogin;
    }

    //เปลี่ยนรหัสผ่านใหม่
    OnChangPassword(accessToken:string,model: IChangePassword){

        // return new Promise((resolve,rejects)=>{
        //     const userProfile=this.mockUserItem.find(item=>item.id == accessToken);
        //     if(!userProfile) return rejects({Message:'ไม่มีข้อมูลผู้ใช้งาน'});
        //     if(userProfile.password !== model.old_pass) return rejects({Message:'รหัสผ่านเดิมไม่ถูกต้อง'});
        //     userProfile.password=model.new_pass;
        //     userProfile.updated= new Date();
        //     resolve(userProfile);
        // });

        return (this.http
            .requestPost('api/member/change-password',model,accessToken)
            .toPromise() as Promise<IAccount>)
            .then(user=> this.SetUserLogin(user));
    }
    
    // แก้ไขข้อมูลส่วนตัว updated Profile
    onupdateProfile(accessToken:string, model:IProfile){
    // return new Promise((resolve, reject )=>{
    //     const userProfile =this.mockUserItem.find(user => user.id==accessToken);
    //     if(!userProfile) return reject({Message:'ไม่มีผูเใช้งานนี้ ในระบบ'});
    //     userProfile.firstname=model.firstname;
    //     userProfile.lastname=model.lastname;
    //     userProfile.position=model.position;
    //     userProfile.image=model.image;
    //     userProfile.updated= new Date();
    //     resolve(userProfile);
    // });
     return (this.http
    .requestPost('api/member/profile',model,accessToken)
    .toPromise() as Promise<IAccount>)
    .then(user=> this.SetUserLogin(user));
    
    }

    //ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก Token
    getUserLogin(accessToken:string){
        // return new Promise<IAccount>((resolve,rejects) => {
        //     const userLogin = this.mockUserItem.find(m=>m.id == accessToken);
        //     if(!userLogin) return rejects({Message:'accessToken ไม่ถูกต้อง'});
        //     resolve(userLogin);
        // });
        return (this.http
        .requestGet('api/member/data',accessToken)
        .toPromise() as Promise<IAccount>)
        .then(userLogIn=> this.SetUserLogin(userLogIn));
    }

    //เข้าสู่ระบบ
    onLogin(model: ILogin){
        // return new Promise<{accessToken:string}>((resolve,rejects)=>{
        //     // resolve(model);
        //  const userLogin=  this.mockUserItem.find(Item=>Item.email==model.email&&Item.password==model.password)
        //   if (!userLogin) return rejects({Message:'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'});
        // //   resolve (userLogin);
        // resolve ({
        //     accessToken:userLogin.id
        // });

        // });
        return this.http
        .requestPost('api/account/login',model)
        .toPromise() as Promise<{accessToken :string}>;
    }

    //ลงทะเบียน
    onRegister(model: IRegister){
    //      return new Promise((resolve,reject)=>{
    //          const _model: IAccount= model;
    //          _model.id=Math.random();
    //          _model.image=null;
    //          _model.position='';
    //          _model.role=IRoleAccount.Member;
    //          _model.created= new Date();
    //          _model.updated= new Date();
    //          this.mockUserItem.push(model);
    //         resolve(model);
    // });

    return this.http
    .requestPost('api/account/register',model)
    .toPromise() as Promise<IAccount>;
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
    created?:Date;
    updated?:Date;
}   

export enum IRoleAccount{
    Member=1,
    Employee,
    Admin
}