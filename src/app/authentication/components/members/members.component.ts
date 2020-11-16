import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/members.service';
import { IMember, IMembersComponent, IMemberSearch, IMemberSearchKey } from './members.interface';
import { IAccount, IRoleAccount } from 'src/app/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers:[MemberService]
})

export class MembersComponent implements IMembersComponent {

  constructor(
   private  member:MemberService,
   private  alert:AlertService,
   private  detect: ChangeDetectorRef
  ) { 
    this.initialLoadMembers({
      startPage:this.startPage,
      limitPage:this.limitPage
    });
    //กำหนดค่าเริ่มต้น SeaechType
    this.SeaechType=this.SeaechTypeItems[0]
  }

  string: any;
  items: IMember;

  //ตัวแปล Pagination
  startPage:number=1;
  limitPage:number=5;

  //เปลี่ยนหน้า Pagination
  onpageChanged(page:PageChangedEvent){
    this.initialLoadMembers({
        searchText: this.SeaechType.key == 'role' ? IRoleAccount[this.SearchText] || '': this.SearchText,
        searchType: this.SeaechType.key,
        startPage:page.page,
        limitPage:page.itemsPerPage
    });
  }


    //ตัวแปลสำหรับค้นหา
  SearchText:string='';
  SeaechType:IMemberSearchKey;
  SeaechTypeItems:IMemberSearchKey[]=[
    { key:'email',value:"ค้นหาจากอีเมล์" },
    { key:'firstname',value:"ค้นหาจากชื่อ" },
    { key:'lastname',value:"ค้นหาจากนามสกุล" },
    { key:'position',value:"ค้นหาจากตำแหน่ง" },
    { key:'role',value:"ค้นหาจากสิทธ์ผู้ใช้" },
  ];

  
    //ค้นหาข้อมูล
    OnSeachItem(){
      this.startPage=1;
      this.initialLoadMembers({
        searchText: this.SeaechType.key == 'role' ? IRoleAccount[this.SearchText] || '': this.SearchText,
        searchType: this.SeaechType.key,
        startPage:this.startPage,
        limitPage:this.limitPage
      });
    //กระตู้น  Event
    this.detect.detectChanges()

    }


    //แสดงชื่อสิทธ์ผู้ใช้งาน
    getRoleName(role:IRoleAccount){
      return IRoleAccount[role];
    }


    //โหลดข้อมูลสมาชิก
    private initialLoadMembers(options?: IMemberSearch){
      this.member
          .getMembers(options)
          .then(items=>{
            // console.log(item);
            this.items=items;
          })
          .catch(err=>this.alert.notify(err.Message));

    }
}