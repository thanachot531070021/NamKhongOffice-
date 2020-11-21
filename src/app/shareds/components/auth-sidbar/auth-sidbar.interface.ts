import { IRoleAccount } from 'src/app/services/account.service';
import { IAccount } from '../../../services/account.service';

export interface IAuthSidbarComponent{
    AppURL:any;
    AuthURL:any;
    UserLogin:IAccount;
    Role: typeof IRoleAccount;
}
