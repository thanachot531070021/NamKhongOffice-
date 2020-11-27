import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAccount } from './account.service';

@Injectable({
    providedIn:'root'
}
)
export class HttpService{
    constructor(private http: HttpClient)
    {
    
    }

    private address: string='http://localhost:3000/';



    //ส่งข้อมูลแบบ get  method
    requestGet(url: string,accessToken?:string){
        return this.http
        .get(`${this.address}${url}`,{
            headers:this.appenHeaders(accessToken)
        })
        .pipe(catchError(err=>this.handelError(err)));
    }

    //ส่งข้อมูลแบบ get  delete
    requestDelete(url: string,accessToken?:string){
        return this.http
        .delete(`${this.address}${url}`,{
            headers:this.appenHeaders(accessToken)
        })
        .pipe(catchError(err=>this.handelError(err)));
    }
    
    //ส่งข้อมูลแบบ post  method
    requestPost(url: string,body:any,accessToken?:string){
        return this.http
        .post(`${this.address}${url}`,body,{
            headers:this.appenHeaders(accessToken)
        })
        .pipe(catchError(err=>this.handelError(err)));
    }

    //ส่งข้อมูลแบบ put  method
    requestPut(url: string,body:any,accessToken?:string){
        return this.http
        .put(`${this.address}${url}`,body,{
            headers:this.appenHeaders(accessToken)
        })
        .pipe(catchError(err=>this.handelError(err)));
    }

    

    //ปรับแต่งerror ใหม่
    private handelError(errResponse:HttpErrorResponse): Observable<any>{
        errResponse['Message']= errResponse['message'];
        if (errResponse.error && errResponse.error.message)
        errResponse['Message']=errResponse.error.message;
        throw errResponse;
    }

    //เพิ่ม Hearder
    private appenHeaders(accessToken){
        const headers = {};
        if(accessToken) headers['Authorization']=`Bearer ${accessToken}`;
        return new HttpHeaders(headers);
    }



}