import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { MembersListsComponent } from './members/MembersLists/MembersLists.component';
import { ListsComponent } from './Lists/Lists.component';
import { MessagesComponent } from './Messages/Messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/memberDetail/memberDetail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/preventUnsavedChanges.guard';


export const appRoutes: Routes = [

    {path: '', component: HomeComponent},

    {path : '' , runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
    children: [
    {path: 'members', component: MembersListsComponent},
    {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
    {path: 'edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
    {path: 'lists', component: ListsComponent },
    {path: 'messages', component: MessagesComponent}
    ]
},

    {path: '**', redirectTo: '', pathMatch: 'full'}



];
