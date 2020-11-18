import { Route } from '@angular/compiler/src/core';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { promise } from 'protractor';
import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from 'src/app/services/account.service';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { IMember, IMemberSearch } from '../components/members/members.interface';


@Injectable()
export class MemberService {
    constructor(private account:AccountService){
        if (this.account.mockUserItem.length <=2)
        this.generateMember();
     }

                //ดึงข้อมูลสมาชิกทั้งหมด
                getMembers(options?:IMemberSearch){
                    return new Promise <IMember>((resolve,reject)=>{

                    // เรียงข้อมูลใหม่จาก วันที่แก้ไขล่าสุด
                        let items =  this.account.mockUserItem.sort((a1,a2)=>{
                            return Date.parse(a2.update.toString())-Date.parse(a1.update.toString())
                        });

                    // คำนวณเรื่อง pagination
                        const startItem = (options.startPage- 1) * options.limitPage;
                        const endItem = options.startPage * options.limitPage;

                    //หากมีการค้นหาข้อมูล
                    if(options && (options.searchText) && options.searchType){
                        //ค้นหาข้อมูลมาเก็บไว้ในตัวแปร items
                        items=this.account
                        .mockUserItem
                        .filter(items=>{
                            switch(options.searchType){
                                case 'update':
                                    return items.update>=options.searchText['from'] && items.update<=options.searchText['to']
                                    break;
                                default:
                                   return items[options.searchType].toString().toLowerCase()
                                    .indexOf(options.searchText.toString().toLowerCase()) >= 0
                                    break;
                            }
                        });
                    }
                        resolve({ items:items.slice(startItem,endItem),totalItems:items.length});
                    });
                }

                //ดึงข้อมูลสมาชิกเเค่คนเดียว
                getMemberById(id){
                    return new Promise<IAccount>((resolve,rejects) => {
                        const member =this.account.mockUserItem.find(item=> item.id== id);
                        if(!member) return rejects({Message:'ไม่มีข้อมูลสมาชิกในระบบ'});
                        resolve(member);
                    });
                }

                // เพิ่มข้อมูลสมาชิก
                createMember(model:IAccount){
                    return new Promise((resolve,rejects)=>{
                        if (this.account.mockUserItem.find(item=> item.email==model.email))
                        return rejects ({Message:'อีเมล์นี้มีในระบบแล้ว'});
                        model.id = Math.random();
                        model.create= new Date();
                        model.update=new Date();

                        this.account.mockUserItem.push(model);
                        resolve(model);
                    });
                }

                // ลบข้อมูลสมาชิก
                deleteMember(id:any){
                return new Promise((resolve,rejects)=>{
                const findIndex=this.account.mockUserItem.findIndex(item=>item.id==id);
                if(findIndex<0) return rejects({Message:'ไม่มีข้อมูลนี้ในระบบ'});
                resolve(this.account.mockUserItem.splice(findIndex,1));
            });
                }
                // แก้ไขข้อมูลสมาชิก
                updateMember(id:any,model:IAccount){
                    return new Promise<IAccount>((resolve,rejects)=>{
                        const member=this.account.mockUserItem.find(item=>item.id==id);
                        if(!member) return rejects({Message:'ไม่มีข้อมูลสมาชิกในระบบ'});

                        // ตรวจว่ามีอีเมล์นี้หรือยัง
                        if(this.account.mockUserItem.find(item=>{
                            item.email==member.email && item.id != member.id
                        }))return rejects({Message:'มีอีเมล์นี้อยู่ในระบบแล้ว'});


                        member.email=model.email;
                        member.password=model.password || member.password; //หากไม่กรอก password ใช้ตัวเดิม
                        member.firstname=model.firstname;
                        member.lastname=model.lastname;
                        member.position=model.position;
                        member.role=model.role;
                        member.image=model.image;
                        member.update= new Date();
                        resolve(member);
                    });
                }


                //จำลองข้อมูลสมาชิก เพื่อทำ pagination
                private generateMember() {
                    const positions=['front end developer','Back end developer']
                    const roles=[IRoleAccount.Member,IRoleAccount.Employee,IRoleAccount.Admin]
                    // this.account.mockUserItem.splice(2);
                            for (let i = 3; i <= 100; i++) {
                                this.account.mockUserItem.push({
                                    id:     i.toString(),
                                    firstname: `Fristname ${i}`,
                                    lastname: `Lastname ${i}`,
                                    email: `Emai-${i}@hotmail.com`,
                                    password:`123456`,
                                    position: positions[Math.round(Math.random() *1)],
                                    role:roles[Math.round(Math.random() *2)],
                                    create: new Date(),
                                    update:new Date(2020,10,Math.round(Math.random()*18+1))
                                });
                                
                            }
                }


}