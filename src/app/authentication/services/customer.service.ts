import { Injectable } from "@angular/core";
import { AccountService, IAccount } from "src/app/services/account.service";
import { AuthenService } from "src/app/services/authen.service";
import { HttpService } from "src/app/services/http.service";
import { ICustomer, ICustomerSearch } from "../components/Customer/customer/customer.interface";
declare let $;

@Injectable()
export class CustomerService{
    constructor(
        private account:AccountService,
        private authen:AuthenService,
        private http:HttpService
    ){
    }

     //ดึงข้อมูลcustomer
 getCustomer(options?:ICustomerSearch){
    return this.http
    .requestGet(`api/Customer?${$.param(options)}`,this.authen.getAuthenticated())
    .toPromise() as Promise<ICustomer>;
  }

  //ดึงข้อมูลสมาชิกเเค่คนเดียว
  getCustomerById(id){
    return this.http
    .requestGet(`api/Customer/${id}`,this.authen.getAuthenticated())
    .toPromise() as Promise<IAccount>;
  }

}