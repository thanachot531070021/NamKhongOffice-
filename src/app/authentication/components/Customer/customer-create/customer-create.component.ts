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
}
