import { SharedsService } from './services/shareds.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule, } from 'ngx-bootstrap/dropdown';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidbarComponent } from './components/auth-sidbar/auth-sidbar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { AlertService } from './services/alert.service';
import { AccountService } from '../services/account.service';
import {ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// V importเพื่อ ให้ใช้ routerLink ได้เพราะหน้า  AuthNavbarComponent ใช้งานจาก shareds.module ใช้ที่ไหนให้ไป  import ไปว่างใส่ที่นั้น
import { RouterModule } from '@angular/router';  
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidatorsService } from './services/validators.service';

//เพิ่มภาษาไทยให้ Datepicker
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thLocale } from 'ngx-bootstrap/locale';
defineLocale('th', thLocale);

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    
  ],
  declarations: [
      AuthNavbarComponent,
      AuthSidbarComponent,
      AuthContentComponent
      
    ],
    exports:[
        AuthNavbarComponent,
        BsDropdownModule,
        AuthSidbarComponent,
        AuthContentComponent,
        ReactiveFormsModule,
        FormsModule,
        ModalModule,
        PaginationModule,
        BsDatepickerModule
    ],
    providers:[
      AlertService,
      SharedsService,
      // AccountService,
      ValidatorsService
    ]
    


})
export class SharedsModule { }
