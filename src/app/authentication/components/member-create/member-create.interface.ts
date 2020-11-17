import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IRoleAccount } from 'src/app/services/account.service';
export interface IMembersCreateComponent{
    form:FormGroup;
    memId: any;
    positionItem: string[];
    roleItem: IRoleAccount[];

    onSubmit():void;
    getRoleName(role:IRoleAccount):string;
    onConverImage(Input:HTMLInputElement);
}