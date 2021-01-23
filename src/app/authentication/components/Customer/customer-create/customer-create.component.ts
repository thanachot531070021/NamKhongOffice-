import { from } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { CustomerService } from 'src/app/authentication/services/customer.service';
import { ICustomerCreateComponent } from 'src/app/authentication/components/Customer/customer-create/customer-create.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'src/assets/js/jquery-3.2.1.min.js';
@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})

export class CustomerCreateComponent implements ICustomerCreateComponent {

  constructor(
    private Builder:FormBuilder,
    private activatedRouter:ActivatedRoute
) {
  this.activatedRouter.params.forEach(params =>{
    this.cusId=params.id;
  });

  this.initialCreateFormData();
  this.GetProvinces();
  this.GetAmphures();
  this.GetDistricts();

 }


    form: FormGroup;
    cusId: any;
    private initialCreateFormData(){
      this.form=this.Builder.group({
        supType:['',[Validators.required]],
        firstname:['',[Validators.required,Validators.email]],
        lastname:['',[Validators.required]],
        supname:[''],
        phone:[''],
        email:[''],
        idprovince:[''],
        address:['']

      });
  }
  


  private GetProvinces(){
    $.ajax({
      type: 'get', url: "https://localhost:44320/api/Address/GetProvinces?searchText=",
      data: {Searchtext : ''},
      success: function (resault){
        console.log(resault);

        $("#input_province").empty();
        $("#input_province").append('  <option value="">กรุณาเลือกข้อมูล</option>'); 
        for(var i = 0 ;i <resault.items.length ;i++ ){
          $("#input_province").append('<option value="'+resault.items[i].PROVINCE_CODE+'">'+ resault.items[i].PROVINCE_NAME+'</option>');
        }
      }
    })}

    private GetAmphures(){
      $.ajax({
        type: 'get', url: "https://localhost:44320/api/Address/GetAmphures?searchID=38",
        data: {Searchtext : ''}, 
        success: function (resault){
          // console.log(resault);
          $("#input_amphures").empty(); 
          $("#input_amphures").append('  <option value="">กรุณาเลือกข้อมูล</option>'); 
          for(var i = 0 ;i <resault.items.length  ;i++ ){
            $("#input_amphures").append('  <option value="'+resault.items[i].AMPHUR_CODE+'">'+ resault.items[i].AMPHUR_NAME+'</option>'); 
          }
        }
      })}
  
      private GetDistricts(){
        $.ajax({
          type: 'get', url: "https://localhost:44320/api/Address/GetDistricts?searchID=591",
          data: {Searchtext : ''}, 
          success: function (resault){
            // console.log(resault);
            $("#input_districts").empty(); 
            $("#input_districts").append('  <option value="">กรุณาเลือกข้อมูล</option>'); 
            for(var i = 0 ;i <resault.items.length  ;i++ ){
              $("#input_districts").append('  <option value="'+resault.items[i].DISTRICT_CODE+'">'+ resault.items[i].DISTRICT_NAME+'</option>'); 
            }
          }
        })}



}
