import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})

export class AuthenService{
    private accessKey = 'accessToken';

    //กำหนดค่า access ไว้ในความจำ browser
    setAuthenticated(accressToken:string): void{
        localStorage.setItem(this.accessKey,accressToken)
    }

    //ดึงค่า AccressToken ไว้ในความจำ browser ออกมา
    getAuthenticated ():string{
      return  localStorage.getItem(this.accessKey);
    }

    //ล้างค่า accessToken ที่อยู่ในความจำ browser ออกมา
    clearAuthenticated():void{
        localStorage.removeItem(this.accessKey)
    }

}