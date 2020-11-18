import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/members.service';
import { IMember, IMembersComponent, IMemberSearch, IMemberSearchKey } from './members.interface';
import { IAccount, IRoleAccount } from 'src/app/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers:[MemberService]
})

export class MembersComponent implements IMembersComponent {

  constructor(
   private  member:MemberService,
   private  alert: AlertService,
   private  detect: ChangeDetectorRef,
   private  router:Router
  ) { 
    this.initialLoadMembers({
      startPage:this.startPage,
      limitPage:this.limitPage
    });
    //กำหนดค่าเริ่มต้น SeaechType
    this.SeaechType=this.SeaechTypeItems[0]
  }


  onDeleteMember(item: IAccount) {
    throw new Error('Method not implemented.');
  }

  void: any;
  string: any;
  items: IMember;

  //ตัวแปล Pagination
  startPage:number=1;
  limitPage:number=5;

  //เปลี่ยนหน้า Pagination
  onpageChanged(page:PageChangedEvent){
    this.initialLoadMembers({
        searchText: this.getSearchText,
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
    { key:'update',value:"ค้นหาจากวันที่" },
  ];

  
    //ค้นหาข้อมูล
    OnSeachItem(){
      this.startPage=1;
      this.initialLoadMembers({
        searchText: this.getSearchText,
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

    //ลบข้อมูลสมาชิก
    OnDeleteMember(item: IAccount){
      this.alert.confirm()
      .then(status=>{
        if (!status) return;
        this.member
        .deleteMember(item.id)
        .then(()=>{
          // โหลดข้อมูล Memberใหม่
          this.initialLoadMembers({
            searchText: this.getSearchText,
            searchType: this.SeaechType.key,
            startPage:this.startPage,
            limitPage:this.limitPage
          });
          this.alert.notify('ลบข้อมูลสำแล้ว','info')
        })
        .catch(err=> this.alert.notify(err.Message));
      });

    }

    //แก้ไข ข้อมูลสมาชิกโดยส่ง id ไป  url
    onUpdateMember(item: IAccount){
      this.alert.notify(item.id)
      this.router.navigate([''
      ,AppURL.Authen,
      AuthURL.Membercreate,
      item.id
    ]);
    }

    // ตรวจสอบและ Return ค่า SearchText
    private get getSearchText() {
      return this.SeaechType.key == 'role' ? IRoleAccount[this.SearchText] || '': this.SearchText
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
