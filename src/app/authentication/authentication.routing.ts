import { AppURL } from './../app.url';
import { CustomerCreateComponent } from "./components/Customer/customer-create/customer-create.component";
import { CustomerComponent } from './components/Customer/customer/customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthURL } from './authentication.url';
import {Routes, RouterModule} from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BootstrapElementsComponent } from './components/bootstrap-elements/bootstrap-elements.component';
import { CardsComponent } from './components/cards/cards.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { MembersComponent } from './components/members/members.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { IRoleAccount } from '../services/account.service';

const RouteLists: Routes = [
{path: '', redirectTo: AuthURL.Profile, pathMatch: 'full'},
{ path: AuthURL.Dashboard, component: DashboardComponent,
    canActivate:[UserRoleGuard],
    data:{ roles: [IRoleAccount.Admin] }},
{ path: AuthURL.Setting, component: SettingComponent},
{ path: AuthURL.Profile, component: ProfileComponent},
{ path: AuthURL.Elements, component: BootstrapElementsComponent},
{ path: AuthURL.Cards, component: CardsComponent},
{ path: AuthURL.Widgets, component: WidgetsComponent},

{ path: AuthURL.Members, component: MembersComponent,
    canActivate:[UserRoleGuard],
    data:{ roles: [IRoleAccount.Admin,IRoleAccount.Employee] }
},
{
    path: AuthURL.Membercreate,
    canActivate:[UserRoleGuard],
    data:{ roles: [IRoleAccount.Admin] },
     children : [
        {path:'', component: MemberCreateComponent},
        {path:':id', component: MemberCreateComponent}
    ]
},
{ path: AuthURL.Customer, component: CustomerComponent,
    canActivate:[UserRoleGuard],
    data:{ roles: [IRoleAccount.Admin,IRoleAccount.Employee] }
},
{
    path: AuthURL.Customercreate,
    canActivate:[UserRoleGuard],
    data:{ roles: [IRoleAccount.Admin] },
     children : [
        {path:'', component: CustomerCreateComponent},
        {path:':id', component: CustomerCreateComponent}
    ]
},


];

export const AuthenticationRouting = RouterModule.forChild(RouteLists);
