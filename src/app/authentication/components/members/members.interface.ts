import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IAccount, IRoleAccount } from 'src/app/services/account.service';

export interface IMembersComponent{
    items: IMember;

    //ส่วนของการค้นหา
    SearchText: string;
    SeaechType :  IMemberSearchKey;
    SeaechTypeItems: IMemberSearchKey[];

    OnSeachItem():void;

    //ส่วนของ Pagination
    startPage:number;
    limitPage:number;
    onpageChanged(page:PageChangedEvent)

    getRoleName(role:IRoleAccount); string;
}
export interface IMember{
    items: IAccount[];
    totalItems:number;
}

export interface IMemberSearch{
    searchText?:string;
    searchType?:string;

    startPage:number;
    limitPage:number;
}


export interface IMemberSearchKey{
    key: string;
    value:string;
}