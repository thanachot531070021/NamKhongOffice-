import { AuthenService } from 'src/app/services/authen.service';
import { HttpService } from './../../services/http.service';
import { Route } from '@angular/compiler/src/core';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { promise } from 'protractor';
import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from 'src/app/services/account.service';
import { IMember, IMemberSearch } from '../components/members/members.interface';
declare let $;

@Injectable()
export class MemberService {
    constructor(
        private account:AccountService,
        private authen:AuthenService,
        private http:HttpService
        ){
        }

                //ดึงข้อมูลสมาชิกทั้งหมด
                getMembers(options?:IMemberSearch){

                    return this.http
                    .requestGet(`api/member?${$.param(options)}`,this.authen.getAuthenticated())
                    .toPromise() as Promise<IMember>;

                    // return new Promise <IMember>((resolve,reject)=>{

                    // // เรียงข้อมูลใหม่จาก วันที่แก้ไขล่าสุด
                    //     let items =  this.account.mockUserItem.sort((a1,a2)=>{
                    //         return Date.parse(a2.updated.toString())-Date.parse(a1.updated.toString())
                    //     });

                    // // คำนวณเรื่อง pagination
                    //     const startItem = (options.startPage- 1) * options.limitPage;
                    //     const endItem = options.startPage * options.limitPage;

                    // //หากมีการค้นหาข้อมูล
                    // if(options && (options.searchText) && options.searchType){
                    //     //ค้นหาข้อมูลมาเก็บไว้ในตัวแปร items
                    //     items=this.account
                    //     .mockUserItem
                    //     .filter(items=>{
                    //         switch(options.searchType){
                    //             case 'updated':
                    //                 return items.updated>=options.searchText['from'] && items.updated<=options.searchText['to']
                    //                 break;
                    //             default:
                    //                return items[options.searchType].toString().toLowerCase()
                    //                 .indexOf(options.searchText.toString().toLowerCase()) >= 0
                    //                 break;
                    //         }
                    //     });
                    // }
                    //     resolve({ items:items.slice(startItem,endItem),totalItems:items.length});
                    // });

                }

                //ดึงข้อมูลสมาชิกเเค่คนเดียว
                getMemberById(id){
                    return this.http
                    .requestGet(`api/member/${id}`,this.authen.getAuthenticated())
                    .toPromise() as Promise<IAccount>;
                    // return new Promise<IAccount>((resolve,rejects) => {
                    //     const member =this.account.mockUserItem.find(item=> item.id== id);
                    //     if(!member) return rejects({Message:'ไม่มีข้อมูลสมาชิกในระบบ'});
                    //     resolve(member);
                    // });
                }

                // เพิ่มข้อมูลสมาชิก
                createMember(model:IAccount){
                    return this.http
                    .requestPost('api/member',model,this.authen.getAuthenticated())
                    .toPromise() as Promise <IAccount>
                    // return new Promise((resolve,rejects)=>{
                    //     if (this.account.mockUserItem.find(item=> item.email==model.email))
                    //     return rejects ({Message:'อีเมล์นี้มีในระบบแล้ว'});
                    //     model.id = Math.random();
                    //     model.created= new Date();
                    //     model.updated=new Date();

                    //     this.account.mockUserItem.push(model);
                    //     resolve(model);
                    // });
                }

                // ลบข้อมูลสมาชิก
                deleteMember(id:any){
                    return this.http
                    .requestDelete(`api/member/${id}`,this.authen.getAuthenticated())
                    .toPromise() as Promise <number>
                // return new Promise((resolve,rejects)=>{
                // const findIndex=this.account.mockUserItem.findIndex(item=>item.id==id);
                // if(findIndex<0) return rejects({Message:'ไม่มีข้อมูลนี้ในระบบ'});
                // resolve(this.account.mockUserItem.splice(findIndex,1));
                // });
                }
                // แก้ไขข้อมูลสมาชิก
                updateMember(id:any,model:IAccount){
                    return this.http
                    .requestPut(`api/member/${id}`,model,this.authen.getAuthenticated())
                    .toPromise() as Promise<IAccount>
                    // return new Promise<IAccount>((resolve,rejects)=>{
                    //     const member=this.account.mockUserItem.find(item=>item.id==id);
                    //     if(!member) return rejects({Message:'ไม่มีข้อมูลสมาชิกในระบบ'});

                    //     // ตรวจว่ามีอีเมล์นี้หรือยัง
                    //     if(this.account.mockUserItem.find(item=>{
                    //         item.email==member.email && item.id != member.id
                    //     }))return rejects({Message:'มีอีเมล์นี้อยู่ในระบบแล้ว'});


                    //     member.email=model.email;
                    //     member.password=model.password || member.password; //หากไม่กรอก password ใช้ตัวเดิม
                    //     member.firstname=model.firstname;
                    //     member.lastname=model.lastname;
                    //     member.position=model.position;
                    //     member.role=model.role;
                    //     member.image=model.image;
                    //     member.updated= new Date();
                    //     resolve(member);
                    // });
                }


}