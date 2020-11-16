import { IAccount } from '../../../services/account.service';

export interface IAuthSidbarComponent{
    AppURL:any;
    AuthURL:any;
    UserLogin:IAccount;
}
