import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService, IAccount, IRoleAccount } from 'src/app/services/account.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ICustomer, ICustomerComponent, ICustomerSearch, ICustomerSearchKey } from './customer.interface';
import { CustomerService } from 'src/app/authentication/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers:[CustomerService]
})
export class CustomerComponent implements ICustomerComponent {

  constructor(
    private  customer:CustomerService,
    private  alert: AlertService,
    private  detect: ChangeDetectorRef,
    private  router:Router,
    private localeService: BsLocaleService,
    private authen:AuthenService,
    private account:AccountService

  ) {

    
  //เปลี่ยน Datepicker เป็นภาษาไทย
  this.localeService.use('th');

  //โหลดข้อมูลสมาชิก
this.initialLoadCustomer({
 startPage:this.startPage,
 limitPage:this.limitPage
});

//กำหนดค่าเริ่มต้น SeaechType
this.SeaechType=this.SeaechTypeItems[0]

// User login
this.initialLoadUserLogin();

   }
   void: any;
   string: any;
  
   items: ICustomer;
   totalItems: number;

    //ตัวแปล Pagination
    startPage:number=1;
    limitPage:number=5;

    //ตรวจสอบ สิทธิ์ผู้ใช้งาน
    UserLogin:IAccount;
    Role = IRoleAccount;

      //ตัวแปลสำหรับค้นหา
      SearchText:string='';
      SeaechType:ICustomerSearchKey;
      SeaechTypeItems:ICustomerSearchKey[]=[
        { key:'firstname',value:"ค้นหาจากชื่อ" },
        { key:'lastname',value:"ค้นหาจากนามสกุล" },
        { key:'phone',value:"ค้นหาจากเบอร์โทร" },
        { key:'email',value:"ค้นหาจากอีเมล์" },
        { key:'supname',value:"ค้นหาจากสถานี่ทำงาน" },
      ];


  //โหลดข้อมูลสมาชิก
  private initialLoadCustomer(options?: ICustomerSearch){
    this.customer
        .getCustomer(options)
        .then(items=>{
          // console.log(item);
          this.items=items;

        })
        .catch(err=>this.alert.notify(err.Message));
  }




   //โหลดข้อมูลผู้ใช้ไปยัง login
   private initialLoadUserLogin(){
    this.UserLogin  = this.account.UserLogin;
    this.account
    .getUserLogin(this.authen.getAuthenticated())
    .then(userLogin=>
      this.UserLogin=userLogin)
    .catch(err=>this.alert.notify(err.Message));
  }


}
