import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from 'src/app/services/account.service';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { IMember, IMemberSearch } from '../components/members/members.interface';


@Injectable()
export class MemberService {
    constructor(private account:AccountService){
        this.generateMember();
     }

        //ดึงข้อมูลสมาชิกทั้งหมก
        getMembers(options?:IMemberSearch){
            return new Promise <IMember>((resolve,reject)=>{
                let items =  this.account.mockUserItem;

                const startItem = (options.startPage- 1) * options.limitPage;
                const endItem = options.startPage * options.limitPage;

            //หากมีการค้นหาข้อมูล
            if(options && (options.searchText) && options.searchType){
                //ค้นหาข้อมูลมาเก็บไว้ในตัวแปร items
                items=this.account
                .mockUserItem
                .filter(items=>
                    items[options.searchType].toString().toLowerCase()
                .indexOf(options.searchText.toString().toLowerCase()) >= 0
                );
            }

                resolve({ items:items.slice(startItem,endItem),totalItems:items.length});
            });
        
    }

        //จำลองข้อมูลสมาชิก เพื่อทำ pagination
        private generateMember() {
            const positions=['front end developer','Back end developer']
            const roles=[IRoleAccount.Member,IRoleAccount.Employee,IRoleAccount.Admin]
            this.account.mockUserItem.splice(2);
                    for (let i = 3; i <= 333; i++) {
                        this.account.mockUserItem.push({
                            id:     i.toString(),
                            firstname: `Fristname ${i}`,
                            lastname: `Lastname ${i}`,
                            email: `Emai-${i}@hotmail.com`,
                            password:`123456`,
                            position: positions[Math.round(Math.random() *1)],
                            role:roles[Math.round(Math.random() *2)],
                            create: new Date(),
                            update:new Date()
                        });
                        
                    }
        }


}