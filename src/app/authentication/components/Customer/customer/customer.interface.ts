

export interface ICustomerComponent{
    items:ICustomer;
    totalItems:number;

}


export interface ICustomer{
    items: ICustomerModel[];
    totalItems:number;
}

export interface ICustomerSearch{
    searchText?:string;
    searchType?:string;

    startPage:number;
    limitPage:number;
}

export interface ICustomerSearchKey{
    key: string;
    value:string;
}

export interface ICustomerModel{
    id?:any;
    supType:string
    firstname: string
    lastname: string
    phone: string
    email: string
    supname: string
    address: string

    created?:Date;
    updated?:Date;
}




