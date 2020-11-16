import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IRoleAccount } from 'src/app/services/account.service';
export interface IMembersCreateComponent{
    positionItem: string[];
    roleItem: IRoleAccount[];

    form:FormGroup;
    onSubmit():void;
    getRoleName(role:IRoleAccount):string;
    onConverImage(Input:HTMLInputElement);
}